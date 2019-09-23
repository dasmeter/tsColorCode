import { IOption } from "./IOption"
/* QUESTION 1 - do i need to import IMapping from IOption?*/
import { IMapping } from "./IOption"
import { Colors} from "./colors"

export class InputParser {
    /**
     * Parses and gets a FieldName from a dictionary.
     * @param {IDictionaryStringTo<string>} inputs - The dictionary has the structure:
     *   {
     *      "FieldName": "Priority",
     *      "Colors": "red;orange;yellow;blue",
     *      "Values": "0;1;2;3",
     *      "Labels": "Critical;High;Medium;Low"
     *   }
     * @return {string} The FieldName 
     * @throws Will throw an {string} error if a FieldName is not specified in the dictionary.
     */


    public static getFieldName(inputs: IDictionaryStringTo<string>): string {
        if (inputs["FieldName"]) {
            return inputs["FieldName"];
        }
        throw ("FieldName not specified.")
    }

/**
 * Parses and gets a FieldName2 from a dictionary.
 * @param {IDictionaryStringTo<string>} inputs - The dictionary has the structure:
 *   {
 *      "FieldName": "Severity",
 *      "Colors": "red;orange;yellow;blue",
 *      "Values": "1 - Crtical, 2 - High, 3 - Medium, 4 - Low",
 *      "Labels": "Critical;High;Medium;Low"
 *   }
 * @return {string} The FieldName2
 * @throws Will throw an {string} error if a FieldName2 is not specified in the dictionary.
 */

    public static getFieldName2(inputs: IDictionaryStringTo<string>): string {
        if (inputs["FieldName2"]) {
            return inputs["FieldName2"];
        }
        throw ("FieldName2 not specified.")
    }
    /**
     * Parses the inputs from a {IDictionaryStringTo<string>} dictionary.
     * @return an array of Interfaces of the structure: {
     *           
     *           From IOption - IMapping Block
                
                fields1 local variable maps to f1 in IOption - which is 'Priority' 
     *           f1: fields1[i],
                 f2: fields2[i],

                 From IOption 
     *           color: colors[i],
     *           mapping: IMapping ???
     *       }
     * @throws Will throw an {string} error if allowedValues are not specified.
     */
    /* QUESTIONN 2 ** - HOW DO I FORMAT getOptions? do I include IMapping with IOption? */
    public static getOptions(inputs: IDictionaryStringTo<string>): IOption[], IMapping[] {

        /* QUESTION 3 Do we need an If Else block here? */

        /*if (allowedValues && allowedValues.length) {
            let colors: string[] = [];
            let inputColors: string[] = [];
            let labels: string[] = [];
            let inputLabels: string[] = [];

            inputColors = InputParser._extractInputs(inputs["Colors"]);
            inputLabels = InputParser._extractInputs(inputs["Labels"]);

            colors = InputParser._getColors(inputColors, allowedValues);
            labels = InputParser._getLabels(inputLabels, allowedValues);

            return InputParser._buildOptions(allowedValues, colors, labels);*/

  
            let colors: string[] = [];
            let fields1: string[] = [];
            let fields2: string[] = [];


            /* 
            QUESTION 4 DO I NEED TO USE INPUTCOLORS? AND WHAT'S THE SYNTAX FOR "Colors" Is it Mapping.Colors ?
            APPEARS TO BE GETTING "Colors from vss-extensions.json - we have "Mapping" instead */

            inputColors = InputParser._extractInputs(inputs["Mapping.Colors"]);

            
        } else {
            throw ("The backing field does not have allowed values.");
        }
    
    /**
     * Parses {string} rawInput, converting the input to an array of values.
     * @param {string} rawInput - The string consists of colors or labels 
     *                            separated by ";"
     * @return {string[]} inputs (either colors or labels)
     * @static 
     * @private
     */
    private static _extractInputs(rawInput: string): string[] {
        if (rawInput) {
            return rawInput.split(";");
        }
        return [];
    }
    /**
     * Takes {string[]} inputColors and string{[]} values, and maps {string} colors
     * to every value. Also, it checks if the colors were correctly inputed.
     * @return {string[]} newColors - An array of {string} colors that match
     *         the number of values.
     * @static
     * @private
     */
    private static _getColors(inputColors: string[], values: string[]): string[] {
        if(inputColors.length < values.length) {
            //append default colors if we are given less colors than values
            return inputColors.concat(Colors.getColors(values.length).slice(inputColors.length));
        } else {
            return inputColors.slice(0, values.length);
        }
    }
    /**
     * Takes {string[]} inputLabels and string{[]} values, and maps {string} labels
     * to every value. If more values were provided, it ignores them. If less labels
     * than values were provided, it fills the array with empty strings ("");
     * @return {string[]} newLabels - An array of {string} labels that match
     *         the number of values.
     * @static
     * @private
     */
    private static _getLabels(inputLabels: string[], values: string[]): string[] {
        // Values length can never be 0, labels length can be 0 or more 
        // Defaults to empty string if less labels than values are provided
        return values.map((v, idx) => inputLabels[idx] || "");
    }
    /**
     * Takes {string[]} values, colors and labels; and populates an array of interfaces of the
     * form {value: "string", color: "string", label: "string"}
     * @return {IOptions []} options
     * @static
     * @private
     */
    private static _buildOptions(values: string[], colors: string[], labels: string[]): IOption[] {
        let options: IOption[] = [];
        let valuesLength: number = values.length;

        for (let i = 0; i < valuesLength; i++) {
            options.push({
                value: values[i],
                color: colors[i],
                label: labels[i]
            });
        }
        return options;
    }
}