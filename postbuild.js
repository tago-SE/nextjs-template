
require("dotenv").config();
const { setEnvValue } = require("./src/EnvHelper");

const postbuild = async () => {
    console.log("Postbuild: Started")
    setEnvValue("PREBUILD", "false");
    setEnvValue("POSTBUILD", "true");
    console.log("Postbuild: Done");
}

postbuild();