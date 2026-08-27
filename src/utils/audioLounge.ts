// Ambient Tokyo-Lima Lounge Generator using Web Audio API (No external assets required)
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

    // Pentatonic scale frequencies for warm Zen & Lounge ambiance (D minor / Japanese Insen scale)
    // D3, F3, G3, A3, C4, D4, F4, G4, A4
    const notes = [146.83, 174.61, 196.00, 220.00, 261.63, 293.66, 349.23, 392.00, 440.00, 523.25];

    // Background Drone Chords (Warm pad)
    const playWarmDrone = () => {
      if (!audioCtx || !masterGain || !isPlaying) return;
      const droneFreqs = [73.42, 110.00, 146.83]; // Low D2, A2, D3
      droneFreqs.forEach((freq) => {
        if (!audioCtx || !masterGain) return;
        const osc = audioCtx.createOscillator();
        const droneGain = audioCtx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
        
        droneGain.gain.setValueAtTime(0, audioCtx.currentTime);
        droneGain.gain.linearRampToValueAtTime(0.015, audioCtx.currentTime + 3);
        droneGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 10);

        osc.connect(droneGain);
        droneGain.connect(masterGain);
        
        osc.start();
        osc.stop(audioCtx.currentTime + 10);
      });
    };

    // Play periodic ethereal chimes
    const playChime = () => {
      if (!audioCtx || !masterGain || !isPlaying) return;

      const randomNote = notes[Math.floor(Math.random() * notes.length)];
      const osc = audioCtx.createOscillator();
      const noteGain = audioCtx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(randomNote, audioCtx.currentTime);

      noteGain.gain.setValueAtTime(0, audioCtx.currentTime);
      noteGain.gain.linearRampToValueAtTime(0.035, audioCtx.currentTime + 0.1);
      noteGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 3.5);

      osc.connect(noteGain);
      noteGain.connect(masterGain);

      osc.start();
      osc.stop(audioCtx.currentTime + 3.6);
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
    console.warn('AudioContext not allowed or supported', err);
    isPlaying = false;
  }
};

export const stopLoungeAudio = () => {
  isPlaying = false;
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  if (masterGain && audioCtx) {
    try {
      masterGain.gain.linearRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);
    } catch (e) {}
  }
};

// Play a quick satisfying interactive flame crackle or knife slice sound on click
export const playInteractiveSizzle = () => {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    if (ctx.state === 'suspended') ctx.resume();

    // Noise buffer for flame torch sizzle
    const bufferSize = ctx.sampleRate * 0.4;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.12));
    }

    const noise = ctx.createBufferSource();
    noise.buffer = buffer;

    // Filter for torch woosh
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(2400, ctx.currentTime + 0.2);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.38);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    noise.start();
  } catch (e) {}
};
