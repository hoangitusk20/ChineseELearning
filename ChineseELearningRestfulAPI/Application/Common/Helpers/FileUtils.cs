namespace ChineseELearningRestfulAPI.Application.Common.Helpers
{
    public class FileUtils
    {
        public static string ReadPromptFromFile(string filePath)
        {
            if (!File.Exists(filePath))
            {
                throw new FileNotFoundException("Prompt file not found", filePath);
            }

            return File.ReadAllText(filePath);
        }
    }
}

