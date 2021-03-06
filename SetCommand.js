const BaseCommand = require('./BaseCommand.js'); 
class SetCommand extends BaseCommand {
    constructor(device_type) {
        super(device_type);
    }

    get audibleFeedback() {
        return this.data[0x0b] & 0x42;
    }

    set audibleFeedback(feedbackEnabled) {
        this.data[0x0b] &= ~0x42; // Clear the audible bits
        this.data[0x0b] |= feedbackEnabled ? 0x42 : 0;
    }

    get powerState() {
        return this.data[0x0b] & 0x01;
    }

    set powerState(state) {
        this.data[0x0b] &= ~0x01; // Clear the power bit
        this.data[0x0b] |= state ? 0x01 : 0;
    }

    get targetTemperature() {
        return this.data[0x0c] & 0x1f;
    }

    set targetTemperature(temperatureCelsius) {
        this.data[0x0c] &= ~0x1f; // Clear the temperature bits
        this.data[0x0c] |= (temperatureCelsius & 0xf) | ((temperatureCelsius << 4) & 0x10);
    }

    get operationalMode() {
        return (this.data[0x0c] & 0xe0) >> 5;
    }

    set operationalMode(mode) {
        this.data[0x0c] &= ~0xe0; // Clear the mode bit
        this.data[0x0c] |= (mode << 5) & 0xe0;
    }

    get fanSpeed() {
        return this.data[0x0d];
    }

    set fanSpeed(speed) {
        this.data[0x0d] = speed;
    }

    get ecoMode() {
        return this.data[0x13] > 0;
    }

    set ecoMode(ecoModeEnabled) {
        this.data[0x13] = ecoModeEnabled ? 0xff : 0;
    }

    get swingMode() {
        return this.data[0x11];
    }

    set swingMode(mode) {
        this.data[0x11] &= ~0x0f; // Clear the mode bit
        this.data[0x11] |= mode & 0x0f;
    }

    get turboMode() {
        return this.data[0x14] > 0;
    }

    set turboMode(turboModeEnabled) {
        this.data[0x14] = turboModeEnabled ? 0x02 : 0;
    }
}
module.exports = SetCommand;