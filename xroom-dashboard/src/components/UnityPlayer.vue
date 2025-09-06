<template>
  <div class="unity-wrapper">
    <div id="unity-container" class="unity-desktop">
      <canvas id="unity-canvas" tabindex="-1"></canvas>
      <div id="unity-loading-bar">
        <div id="unity-logo"></div>
        <div id="unity-progress-bar-empty">
          <div id="unity-progress-bar-full"></div>
        </div>
      </div>
      <div id="unity-warning"></div>
      <div id="unity-footer">
        <div id="unity-logo-title-footer"></div>
        <div id="unity-fullscreen-button"></div>
        <div id="unity-build-title">Xroom</div>
      </div>
    </div>

    <!-- Vue shows message received from Unity -->
    <div class="vue-message">
      <h3>Message from Unity:</h3>
      <p>{{ vueText }}</p>
    </div>
  </div>
</template>




<script>
/* global createUnityInstance */

export default {
  name: "UnityPlayer",
  props: {
    space: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      unityInstance: null,
      vueText: "Waiting for Unity...",
    };
  },
  mounted() {
    console.log(this.space);
    console.log( this.space.name);

    const canvas = document.querySelector("#unity-canvas");

    function unityShowBanner(msg, type) {
      const warningBanner = document.querySelector("#unity-warning");
      const div = document.createElement("div");
      div.innerHTML = msg;
      if (type === "error") div.style = "background: red; padding: 10px;";
      if (type === "warning") div.style = "background: yellow; padding: 10px;";
      warningBanner.appendChild(div);
      if (type !== "error") {
        setTimeout(() => {
          warningBanner.removeChild(div);
        }, 5000);
      }
    }

    const buildUrl = "/unity/Build";
    const loaderUrl = buildUrl + "/webbuild.loader.js";

    const config = {
      dataUrl: buildUrl + "/webbuild.data",
      frameworkUrl: buildUrl + "/webbuild.framework.js",
      codeUrl: buildUrl + "/webbuild.wasm",
      streamingAssetsUrl: "StreamingAssets",
      companyName: "Dadechin",
      productName: "Xroom",
      productVersion: "0.1",
      showBanner: unityShowBanner,
    };

    // Global bridge
    window.receiveFromUnity = (jsonString) => {
      try {
        const data = JSON.parse(jsonString);
        console.log("Data from Unity:", data);
        this.vueText = data.message;
      } catch (err) {
        console.error("Invalid JSON from Unity:", err);
      }
    };

    // Load Unity loader
    const script = document.createElement("script");
    script.src = loaderUrl;
    script.onload = () => {
      createUnityInstance(canvas, config, (progress) => {
        document.querySelector("#unity-progress-bar-full").style.width =
          100 * progress + "%";
      })
        .then((unityInstance) => {
          document.querySelector("#unity-loading-bar").style.display = "none";
          document.querySelector("#unity-fullscreen-button").onclick = () => {
            unityInstance.SetFullscreen(1);
          };

          this.unityInstance = unityInstance;

          // ✅ Send data to Unity
          const token = localStorage.getItem("token");
          if (token) {
            unityInstance.SendMessage("GameController", "SetToken", token);

            // Send Space Name
            unityInstance.SendMessage(
              "GameController",
              "SetSpaceName",
              this.space.name
            );

            // Send Port
            unityInstance.SendMessage(
              "GameController",
              "SetSpacePort",
              String(this.space.port)
            );

            // Send AssetBundle URL
            unityInstance.SendMessage(
              "GameController",
              "SetAssetBundleUrl",
              this.space.assetBundleRoomId.metaquest // or webgl/windows/metaquest if needed
            );
          }
        })
        .catch((message) => {
          alert(message);
        });
    };
    document.body.appendChild(script);
  },
  beforeUnmount() {
    if (this.unityInstance) {
      this.unityInstance.Quit();
    }
  },
};
</script>







<style scoped>
.unity-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px auto;
}

#unity-canvas {
  width: 960px;
  height: 600px;
  background: #000;
}

.vue-message {
  margin-top: 20px;
  padding: 12px 16px;
  background: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.15);
  width: 960px;
  text-align: center;
}
</style>
