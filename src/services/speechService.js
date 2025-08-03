class SpeechService {
  constructor() {
    this.recognition = null;
    this.synthesis = window.speechSynthesis;
    this.isListening = false;
    this.onResult = null;
    this.onError = null;
    this.onEnd = null;
    
    this.initSpeechRecognition();
  }

  initSpeechRecognition() {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      this.recognition = new SpeechRecognition();
      
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-US';
      
      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        if (this.onResult) {
          this.onResult(transcript);
        }
      };
      
      this.recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        if (this.onError) {
          this.onError(event.error);
        }
      };
      
      this.recognition.onend = () => {
        this.isListening = false;
        if (this.onEnd) {
          this.onEnd();
        }
      };
    } else {
      console.error('Speech recognition not supported');
    }
  }

  startListening(onResult, onError, onEnd) {
    if (!this.recognition) {
      console.error('Speech recognition not available');
      if (onError) onError('Speech recognition not supported');
      return false;
    }

    this.onResult = onResult;
    this.onError = onError;
    this.onEnd = onEnd;

    try {
      this.recognition.start();
      this.isListening = true;
      return true;
    } catch (error) {
      console.error('Error starting speech recognition:', error);
      if (onError) onError(error.message || 'Failed to start speech recognition');
      return false;
    }
  }

  stopListening() {
    if (this.recognition && this.isListening) {
      this.recognition.stop();
      this.isListening = false;
    }
  }

  speak(text, onEnd = null) {
    if (this.synthesis) {
      // Cancel any ongoing speech
      this.synthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 1;
      
      if (onEnd) {
        utterance.onend = onEnd;
      }
      
      // Add error handling
      utterance.onerror = (event) => {
        console.error('Speech synthesis error:', event.error);
        if (onEnd) onEnd();
      };
      
      this.synthesis.speak(utterance);
    }
  }

  stopSpeaking() {
    if (this.synthesis) {
      this.synthesis.cancel();
    }
  }

  isSupported() {
    return !!(this.recognition && this.synthesis);
  }
}

export default new SpeechService(); 