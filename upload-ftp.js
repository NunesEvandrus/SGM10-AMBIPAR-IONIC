const FtpDeploy = require("ftp-deploy");
const ftpDeploy = new FtpDeploy();

const AUTH = {
  user: "navemestra2",
  password: "9k8j7h6g",
};

const config = {
  host: "win5014.site4now.net",
  user: AUTH.user,
  password: AUTH.password,
  port: 21,
  localRoot: __dirname + "/www",
  remoteRoot: "/",
  include: ["*", "**/*"], // this would upload everything except dot files

  // e.g. exclude sourcemaps, and ALL files in node_modules (including dot files)
  exclude: [],
  // delete ALL existing files at destination before uploading, if true
  deleteRemote: false,
  // Passive mode is forced (EPSV command is not sent)
  forcePasv: true,
  // use sftp or ftp
  sftp: false,
};

ftpDeploy.on("uploading", (data) => {
  console.log(
    "Progresso: " + data.transferredFileCount + " / " + data.totalFilesCount
  );
});

ftpDeploy.on("upload-error", (data) => {
  console.error("Falha no upload", data.err, data);
});

ftpDeploy
  .deploy(config)
  .then((res) => console.log("finished:", res))
  .catch((err) => console.log(err));
