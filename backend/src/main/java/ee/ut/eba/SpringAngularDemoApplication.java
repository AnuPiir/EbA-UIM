package ee.ut.eba;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import javax.swing.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.io.IOException;

@SpringBootApplication
public class SpringAngularDemoApplication {

	public static void main(String[] args) throws IOException {
		Runtime rt = Runtime.getRuntime();
		String url = "http://localhost:8080";
		rt.exec("rundll32 url.dll,FileProtocolHandler " + url);
		SwingUtilities.invokeLater(
			() -> {
				createAndShowGUI();
				SpringApplication.run(SpringAngularDemoApplication.class, args);
			}
		);
	}

	private static void createAndShowGUI() {
		JFrame frame = new JFrame("Click the window to exit application");
		frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		frame.setSize(400, 300);


		JButton exitButton = new JButton("Exit Application");
		frame.add(exitButton);

		exitButton.addActionListener(new ActionListener() {
			@Override
			public void actionPerformed(ActionEvent e) {
				System.exit(0);
			}
		});


		frame.setVisible(true);
	}
}
