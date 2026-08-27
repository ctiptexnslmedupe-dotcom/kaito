// Ambient Novoandino Lounge Generator using Web Audio API (No external assets required)
let audioCtx: AudioContext | null = null;
let isPlaying = false;
let masterGain: GainNode | null = null;
let intervalId: number | null = null;

export const toggleLoungeAudio = (): boolean => {
  if (isPlaying) {
    stopLoungeAudio();
    return false;
  } else {
    startLoungeAudio();
    return true;
  }
};

export const isLoungePlaying = (): boolean => isPlaying;

export const startLoungeAudio = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    if (!audioCtx) {
      audioCtx = new AudioContextClass();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    masterGain = audioCtx.createGain();
    masterGain.gain.setValueAtTime(0.08, audioCtx.currentTime); // Soft background level
    masterGain.connect(audioCtx.destination);

    isPlaying = true;

    // Pentatonic scale frequencies for warm Andean harmonic ambiance (A minor / Charango & Quena acoustic notes)
    // A3, C4, D4, E4, G4, A4, C5, D5, E5
    const notes = [220.00, 261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25];

    // Background Warm Acoustic Pad (Earth resonance)
    const playWarmDrone = () => {
      if (!audioCtx || !masterGain || !isPlaying) return;
      const droneFreqs = [110.00, 164.81, 220.00]; // A2, E3, A3
      droneFreqs.forEach((freq) => {
        if (!audioCtx || !masterGain) return;
        const osc = audioCtx.createOscillator();
        const droneGain = audioCtx.createGain();
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        
        droneGain.gain.setValueAtTime(0, audioCtx.currentTime);
        droneGain.gain.linearRampToValueAtTime(0.018, audioCtx.currentTime + 3);
        droneGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 10);

        osc.connect(droneGain);
        droneGain.connect(masterGain);
        
        osc.start();
        osc.stop(audioCtx.currentTime + 10);
      });
    };

    // Play periodic Andean chime / string plucked harmonic
    const playChime = () => {
      if (!audioCtx || !masterGain || !isPlaying) return;

      const randomNote = notes[Math.floor(Math.random() * notes.length)];
      const osc = audioCtx.createOscillator();
      const noteGain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(randomNote, audioCtx.currentTime);

      noteGain.gain.setValueAtTime(0, audioCtx.currentTime);
      noteGain.gain.linearRampToValueAtTime(0.04, audioCtx.currentTime + 0.08);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 3.2);

      osc.connect(noteGain);
      noteGain.connect(masterGain);

      osc.start();
      osc.stop(audioCtx.currentTime + 3.3);
    };

    playWarmDrone();
    playChime();

    // Loop ambient intervals
    intervalId = window.setInterval(() => {
      if (!isPlaying) return;
      if (Math.random() > 0.3) {
        playChime();
      }
      if (Math.random() > 0.6) {
        playWarmDrone();
      }
    }, 2800);
  } catch (err) {
    console.error('Lounge audio error', err);
  }
};

export const stopLoungeAudio = () => {
  isPlaying = false;
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  if (masterGain && audioCtx) {
    masterGain.gain.setValueAtTime(masterGain.gain.value, audioCtx.currentTime);
    masterGain.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);
    setTimeout(() => {
      if (!isPlaying && audioCtx && audioCtx.state !== 'closed') {
        // audio muted
      }
    }, 600);
  }
};

// Play warm sizzle sound effect for hot wok / chicharron / flameado
export const playInteractiveSizzle = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = audioCtx || new AudioContextClass();
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const bufferSize = ctx.sampleRate * 1.5;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1; // White noise
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2400, ctx.currentTime);
    filter.Q.setValueAtTime(1.8, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.4);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
    noise.stop(ctx.currentTime + 1.5);
  } catch (err) {
    console.error('Sizzle audio error', err);
  }
};
