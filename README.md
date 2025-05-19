# EbA-UIM

EbA-UIM is a desktop application with a Java backend and an Electron-Angular frontend. 
It uses an embedded SQLite database and manages schema changes using Flyway.

---

## 📁 Project Structure

- **backend/** – Java backend (Spring Boot) built with Maven
- **frontend/** – Electron + Angular frontend

---

## 🚀 Prerequisites

Make sure you have the following tools installed:

### General
- **Java 17**
- **Node.js (>=18 recommended)**
- **npm (>=9)**

---

## ⚙️ Setting up the project environment developers machine [Cloning official guide video](https://www.jetbrains.com/guide/java/tips/clone-project-from-github/)
* Download and install [Intellij Idea Community edition](https://www.jetbrains.com/idea/download/?section=windows) or some other IDE, this guide is for Intellij idea community edition
    * NB! Make sure you download the Community edition not Ultimate
* Find the repository where the code is located at, and get the url for cloning for example currently on Bitbucket: https://bitbucket.org/eba-method/eba-code/src/master/
* Open Intellij installed application and finish the initial configuration
* Click "Get from VCS" in the Intellij Welcome screen
* Paste the Bitbucket (or whichever git management) URL in the url section
* If prompted with red "Git is not installed message" click the blue "Download and install" button and follow instructions
* Press the clone button
* When prompted login to github or any other git managing tool with your account
* When prompted, Trust the project
* The project opens

### How to commit changes
* You must both commit and push changes [Intellij official guide](https://www.jetbrains.com/help/idea/commit-and-push-changes.html#commit)
* Essentially you can press CTRL + K and the commit window will open
    * In the commit window you can see your changes and a checkbox whether to persist them into the git repository
    * You also see a text field where you must put a meaningful commit message
    * In the window press commit and push and follow instructions to persist changes
    * In the case of warnings press commit anyway and push
    * Without changing branches this will commit to "main" branch

---

## 🧪 Backend

### 1. Install the Dependencies

Run the **Maven Lifecycle `install`** phase to download and install all required dependencies.

You can do this in one of two ways:

- **Using IntelliJ IDEA:**  
  Open the **Maven tool window** (usually found on the right side), navigate to the `backend` project, expand the **Lifecycle** section, and double-click on `install`.

- **Using the Command Line (if Maven is installed):**
  ```bash
  mvn clean install
  ```

### 2. Run the Backend

To run the backend independently of the frontend:

1. Navigate to the `SpringAngularDemoApplication.java` file (usually under `src/main/java/...`).
2. Right-click on the file and select **Run 'SpringAngularDemoApplication.main()'**.

IntelliJ will compile and launch the backend using Spring Boot.

### 3. To package the backend for Electron run the Maven Lifecycle package

This step is only needed if you made changes to the backend. This generates a `.jar` file in the `target/` directory. 
The `.jar` file is named `backend-{{version}}.jar` the current version is specified in the backends pom.xml file

## Changing the database structure
* Database data files are located at `backend/src/main/resources/db/migration/data`
* When making data changes you must make a new file into this folder
    * The naming convention in the phase 1 of the development was changed for better readability.
    * When making a new file you must follow the structure below. The new version number must be unique and not used before. 
    * For example if the last database migration file was named `V7__file.sql` then the new file must be named `V8__new_file.sql`.
    * Format: `V{{version}}__meaningful_description_of_data_changes.sql`
* If you want to view the data in the database use IntellJ's integrated Database tool.
    * To import a data source you can rely on the [IntelliJ's how to connect SQLite database guide](https://www.jetbrains.com/help/idea/sqlite.html#connect-to-sqlite-database)

## ✨ Code Formatting with Spotless

The backend project uses [Spotless](https://github.com/diffplug/spotless) to automatically format code and enforce consistent style conventions.

### How It Works

The `spotless-maven-plugin` is configured to run during the **`validate`** phase of the Maven build lifecycle. This means formatting is automatically applied whenever the **`validate`** is run:

You can use the IntelliJ's **Maven tool window** or run the following command
```bash
mvn validate
```
---

## 🌐 Frontend

### 1. Navigate to the frontend directory
```bash
cd frontend
```

### 2. Install all the dependencies
```bash
npm install
```

### 3. Copy the backend JAR to frontend (optional)
```bash
npm run btf
```

This command copies the JAR file from `../backend/target` to `./jars`. 
Only needed if you have made changes to the backend and packaged the new version.

### 3. Run the application

In the `main.js` file there is a parameter `developerMode`. If it is false the frontend will run the packaged backend 
from the `.jar` file given to it. If it is true the backend is not run and the frontend expects the backend to be 
manually run elsewhere.

```bash
npm run electron-build
```

## Changing i18n file translations
* `en.json` and `et.json` files are located at `frontend/src/assets/i18n`
* English translations are located in `en.json` file
* Estonian translations are located in `et.json` file
* Translation keys must match between files
    * For example the key `deleteProjectModal.title` must both be in `en.json` and `et.json` file for it to be used correctly

---

## 📦 Packaging and Creating the Installer

To create an installer for a specific platform, you must run the packaging command on a device with the same operating system.  
For example, to create an installer for **Windows**, you must execute the packaging command on a **Windows machine**.

> **Note:**  
> If you have made changes to the backend, make sure to package the backend and copy the generated `.jar` file into the `frontend/jars/` folder as described earlier.

> **Important:**  
> The installer requires a separate **Java Runtime Environment (JRE)** to function properly on all devices.  
> Download a suitable JRE and place it in the `frontend/jre/` directory before packaging.

### Creating installer for Windows
Run the following command.


```bash
npm run make
```

The installer should appear in the `frontend/out/make/squirrel.windows/x64` folder named `eba-uim_{{version}}.exe`

### Creating installer for macOS arm64
Run the following command.

```bash
npm run package-mac-arm64 && npm run dmg-arm64
```
The installer should appear in the `../release-builds/macOS` folder named `EbA-UIM.dmg`
...
### Creating installer for Linux arm64
...
Run the following command.

```bash
npm run package-linux-arm64 && npm run debian-installer-arm64
```
The installer should appear in the `../release-builds/linux-deb` folder named `eba-uim_1.3.0_arm64.deb`


The same process can be repeated for x64 architecture by replacing `arm64` with `x64` in the commands above.
---

## 👨‍💻 Authors

**EbA-UIM Team**

- **Development Phase 1**  
  Iris Kreinin  
  Karl Olaf Kuldmaa

- **Development Phase 2**  
  Sander Põldma  
  Gerdo Germann  
  Rahel Pettai  
  Timo Kaasik

