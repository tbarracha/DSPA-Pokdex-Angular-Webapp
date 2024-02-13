export class Utils {
    
    static useLegacyImg: boolean = false;

    // Numbers
    // -------------------------------------------------------------------------------------
    static getRandomNumber(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
