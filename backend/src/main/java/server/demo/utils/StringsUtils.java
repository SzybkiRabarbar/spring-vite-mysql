package server.demo.utils;

/**
 * StringsUtils
 */
public class StringsUtils {

    public static String normalizeText(String input) {
        if (input == null) {
            return null;
        }
        // Replace all punctuation characters and whitespaces with an empty
        // string
        String noPunctuation = input.replaceAll("\\p{Punct}|\\s+", "");
        // Convert the text to lowercase
        return noPunctuation.toLowerCase();
    }

    public static String getFileExtension(String fileName) {
        if (fileName == null) {
            return null;
        }
        int lastIndex = fileName.lastIndexOf('.');
        if (lastIndex == -1) {
            return ""; // Empty extension
        }
        return fileName.substring(lastIndex);
    }

}