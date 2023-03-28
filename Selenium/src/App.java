import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.chrome.ChromeDriver;


public class App {
    public static void main(String[] args) throws InterruptedException {
        ChromeDriver driver = new ChromeDriver();
        driver.get("http://www.demoblaze.com");
        driver.manage().window().maximize();
        JavascriptExecutor j = driver;
        if (j.executeScript("return document.readyState").toString().equals("complete")) {
            System.out.println("Page has loaded");
        }
        driver.findElement(By.xpath("//li[@class='nav-item active']//a[@class='nav-link']")).click();
        System.out.println(driver.getTitle());
        String expectedTitle = "STORE";
        String title = driver.getTitle();
        if (title.equalsIgnoreCase(expectedTitle)) {
            System.out.println("Title Matched");
        } else {
            System.out.println("Not a match");
        }
    }
}
