import Docker from 'dockerode';

const docker = new Docker({ socketPath: '/var/run/docker.sock' });

function _dockerRun(imageTag, cmd, opts) {
  docker.run(imageTag, cmd, process.stdout, opts,
    (err, data, container) => {
      if (err) {
        console.log(container, err);
        return;
      }
      console.log(data.statusCode);
    });
}

// async function _dockerPull(imageTag) {
//   console.log(`Pulling docker image: ${imageTag}...`);
//   let SUCCESS_PULLED = false;

//   const stream = await docker.pull(imageTag);

//   await new Promise((resolve, reject) => {
//     docker.modem.followProgress(stream, (err, res) => (err ? reject(err) : resolve(res)));
//   });

//   console.log('after pulling');

//   return (SUCCESS_PULLED = true);
// }

const DockerApi = {

  dockerRun(imageTag, cmd, opts) {
    console.log('Starting Docker container...');

    const image = docker.getImage(imageTag);
    image.inspect((errInspect, data) => { // check if image is already pulled or not
      if (errInspect) {
        if (errInspect.statusCode === 404) {
          console.log(`No such image exists. Trying to pull image: ${imageTag}`);
          docker.pull(imageTag, (errPull, stream) => {
            if (errPull) {
              console.log(errPull);
              return;
            }

            function onFinished(errProgress, output) {
              if (!errProgress) {
                console.log('Done pulling.', output);
                _dockerRun(imageTag, cmd, opts);
              } else {
                console.log(errProgress);
              }
            }
            function onProgress(e) { console.log(e); }
            docker.modem.followProgress(stream, onFinished, onProgress);
          });
        } else {
          console.log(errInspect);
        }
      } else {
        console.log(data);
        _dockerRun(imageTag, cmd, opts);
      }
    });
  },

  dockerVersion() {
    docker.version(
      Meteor.bindEnvironment((err, version) => {
        if (err) return;
        console.log(`docker version: ${version.Version}`);
        // return version.Version;
      }),
    );
  },

  dockerImageList() {
    console.log('Docker Images:');
    docker.listImages(Meteor.bindEnvironment((err, images) => {
      images.forEach((imageInfo) => {
        console.log(`image: ${imageInfo.RepoTags[0]}`);
      });
    }));
  },

  dockerContainerList() {
    console.log('Running Docker containers:');
    docker.listContainers(Meteor.bindEnvironment((err, containers) => {
      containers.forEach((containerInfo) => {
        console.log(containerInfo.Names[0]);
      });
    }));
  },

  dockerInspect(dockerName) {
    console.log(`Inspecting Docker container: ${dockerName}`);

    const container = docker.getContainer(dockerName);

    container.inspect((err, data) => {
      console.log(data);
    });
  },

  dockerStop(dockerName) {
    console.log(`Stopping container ${dockerName}`);

    const container = docker.getContainer(dockerName);

    container.stop();
  },

  dockerStart(dockerName) {
    console.log(`Starting container ${dockerName}`);

    const container = docker.getContainer(dockerName);

    container.start();
  },

  dockerRemove(dockerName) {
    console.log(`Removing container ${dockerName}`);

    const container = docker.getContainer(dockerName);

    container.remove({ force: true });
  },

  dockerRestart(dockerName) {
    console.log(`Restarting container ${dockerName}`);

    const container = docker.getContainer(dockerName);

    container.restart();
  },
};

export default DockerApi;
