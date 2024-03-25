const fs = require("fs");
const { exec } = require("child_process");
const fileName = "./api.client.ts";

// Check if the api.ts file exists, delete it
if (fs.existsSync(fileName)) {
    fs.unlinkSync(fileName);
}

// Check if the .env.local file exists
if (!fs.existsSync(".env.local")) {
    console.error(
        "The .env.local file does not exist. Please create it and add the VITE_API_URL environment variable.",
    );
    return;
}

// Read the contents of the .env.local file
const envLocal = fs.readFileSync(".env.local", "utf8");

// Parse the contents of the .env.local file into an object
const envLocalObj = envLocal.split("\n").reduce((acc, curr) => {
    const [key, value] = curr.split("=");
    if (key && value) {
        acc[key.trim()] = value.trim();
    }
    return acc;
}, {});

const config = {
    template: "Axios",
    dateTimeType: "DayJS",
    operationGenerationMode: "MultipleClientsFromFirstTagAndOperationId",
    generateOptionalParameters: "true",
    generateClientClasses: "true",
    clientBaseClass: "",
    typeStyle: "Interface",
    enumStyle: "StringLiteral",
};

// check if the VITE_API_URL environment variable is URL

let apiEndpoint = new URL(envLocalObj.VITE_API_URL.replace(/"/g, ""));

console.log(`Generating API client for ${apiEndpoint.hostname}`);

const nswagCommand = Array.from(Object.entries(config)).reduce(
    (acc, curr) => {
        const [key, value] = curr;
        acc += `/${key}:${value} `;
        return acc;
    },
    `.\\node_modules\\.bin\\nswag openapi2tsclient /input:${apiEndpoint.protocol
    }//${apiEndpoint.hostname}${apiEndpoint.port ? ":" + apiEndpoint.port : ""
    }/swagger/v1/swagger.json ` + `/output:${fileName} `,
);

console.log(`NSwag NPM CLI command: ${nswagCommand}`);

exec(nswagCommand, (error, stdout, stderr) => {
    if (error) {
        console.error(`NSwag NPM CLI error: ${error}`);
        return;
    }
    console.log(stdout);

    if (stderr)
        console.error(stderr);
}).on("close", (code) => {
    fs.readFile(fileName, "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        const result = data
            .replace(/\/api\//g, "/")
            .replace(
                /result200 = JSON.parse\(resultData200\)/g,
                "result200 = resultData200",
            );

        fs.writeFile(fileName, result, "utf8", (err) => {
            if (err) {
                console.error(err);
                return;
            }
        });
    });
});
