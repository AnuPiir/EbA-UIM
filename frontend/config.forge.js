module.exports = {
    packagerConfig: {
        icon: "assets/icons/mac/icon.icns",
        osxSign: false,
        osxNotarize: false
    },
    makers: [
        {
            name: "@electron-forge/maker-dmg",
            config: {
                format: "ULFO"
            }
        },
        {
            name: "@electron-forge/maker-zip",
            platforms: ["darwin"]
        }
    ]
};
