module.exports = {
    packagerConfig: {
        icon: "assets/icons/mac/icon.icns", // macOS icon
        osxSign: false,
        osxNotarize: false
    },
    makers: [
        // macOS DMG maker
        {
            name: "@electron-forge/maker-dmg",
            config: {
                format: "ULFO"
            }
        },
        // macOS ZIP maker
        {
            name: "@electron-forge/maker-zip",
            platforms: ["darwin"]
        },
        // Linux AppImage maker
        {
            name: "electron-forge-maker-appimage",
            platforms: ["linux"]
        },
        // Linux deb package maker
        {
            name: "@electron-forge/maker-deb",
            platforms: ["linux"]
        }
    ]
};
