// DataSourceConfig.java (Corrected - very minor change to make path building more robust)
package ee.ut.eba.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.jdbc.datasource.DriverManagerDataSource;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;

import javax.sql.DataSource;
import java.io.File;
import java.nio.file.Paths;  // Use Paths for better path handling
import java.util.Properties;

@Configuration
@EntityScan("ee.ut.eba.*")
@EnableJpaRepositories(value = "ee.ut.eba.*")
public class DataSourceConfig {

  @Autowired
  Environment env;

  @Bean
  public DataSource dataSource() {
    DriverManagerDataSource dataSource = new DriverManagerDataSource();
    dataSource.setDriverClassName("org.sqlite.JDBC");

    // Create a user-writable path for the database (using Paths)
    String userHome = System.getProperty("user.home");
    String appDataDir = Paths.get(userHome, "Documents", "EBAM").toString();

    // Ensure the directory exists
    new File(appDataDir).mkdirs();  // This is fine; mkdirs() won't throw an error if it already exists

    String dbPath = Paths.get(appDataDir, "database.db").toString();
    dataSource.setUrl("jdbc:sqlite:" + dbPath);

    // You can set username/password if needed, but SQLite often doesn't require them for file-based DBs
    // dataSource.setUsername("sa");
    // dataSource.setPassword("sa");

    return dataSource;
  }

  @Bean("transactionManager")
  public JpaTransactionManager transactionManager() {
    return new JpaTransactionManager();
  }

}