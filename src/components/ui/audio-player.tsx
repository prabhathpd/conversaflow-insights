
import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { fetchCallRecording } from "@/lib/vapi-service";

interface AudioPlayerProps {
  recordingUrl: string;
}

export function AudioPlayer({ recordingUrl }: AudioPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [isMuted, setIsMuted] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    // Fetch the recording from VAPI
    const loadAudio = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const url = await fetchCallRecording(recordingUrl);
        
        if (!url) {
          setError("Failed to load audio. Please check your VAPI API key in settings.");
        } else {
          setAudioUrl(url);
        }
      } catch (err) {
        setError("An error occurred while loading the audio.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadAudio();
  }, [recordingUrl]);

  const onLoadedMetadata = () => {
    if (audioRef.current) {
      const seconds = Math.floor(audioRef.current.duration);
      setDuration(seconds);
    }
  };

  const togglePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      cancelAnimationFrame(animationRef.current!);
    } else {
      audioRef.current.play();
      animationRef.current = requestAnimationFrame(whilePlaying);
    }
    setIsPlaying(!isPlaying);
  };

  const whilePlaying = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      animationRef.current = requestAnimationFrame(whilePlaying);
    }
  };

  const changeRange = (value: number[]) => {
    if (!audioRef.current) return;
    
    audioRef.current.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  const changeVolume = (value: number[]) => {
    if (!audioRef.current) return;
    
    const newVolume = value[0];
    setVolume(newVolume);
    audioRef.current.volume = newVolume;
    
    if (newVolume === 0) {
      setIsMuted(true);
    } else {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    
    if (isMuted) {
      audioRef.current.volume = volume;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="w-full bg-gray-50 rounded-md p-4 border">
      {isLoading ? (
        <div className="flex justify-center items-center h-16">
          <p className="text-sm text-gray-500">Loading audio...</p>
        </div>
      ) : error ? (
        <div className="flex justify-center items-center h-16">
          <p className="text-sm text-red-500">{error}</p>
        </div>
      ) : (
        <>
          <audio 
            ref={audioRef}
            src={audioUrl || undefined}
            onLoadedMetadata={onLoadedMetadata}
            onEnded={() => setIsPlaying(false)}
          />
          
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={togglePlayPause}
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </Button>
              
              <div className="flex-1 flex items-center gap-2">
                <span className="text-xs text-gray-500 w-8">
                  {formatTime(currentTime)}
                </span>
                <Slider
                  value={[currentTime]}
                  max={duration}
                  step={0.01}
                  onValueChange={changeRange}
                  className="flex-1"
                />
                <span className="text-xs text-gray-500 w-8">
                  {formatTime(duration)}
                </span>
              </div>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleMute}
                aria-label={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <VolumeX className="h-4 w-4" />
                ) : (
                  <Volume2 className="h-4 w-4" />
                )}
              </Button>
              
              <Slider
                value={[isMuted ? 0 : volume]}
                max={1}
                step={0.01}
                onValueChange={changeVolume}
                className="w-20"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
