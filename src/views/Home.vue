<template>
  <div class="about">
    <div class="mapbox">
      <div class="controlsbox" @click="handaddDraw()">+</div>
      <div id="map"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, toRefs, reactive } from "vue";

//地图相关信息
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import * as control from "ol/control";
import { TileSuperMapRest } from "@supermap/iclient-ol";
import TiandituSource from "../assets/map/tianditu";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Draw from "ol/interaction/Draw";

interface mapobj {
  gaiamap: any;
  gaiaSource: any;
  gaiavectorlayer: any;
}

export default defineComponent({
  setup() {
    const msg = "surpermap iclient for openlayers";
    const { gaiamap, gaiaSource, gaiavectorlayer } = initmap("map");

    console.log(gaiamap, gaiaSource, gaiavectorlayer);

    const { gaiaDraw, handaddDraw } = addControls(gaiamap, gaiaSource);
    //初始化地图
    return {
      msg,
      handaddDraw,
    };
  },
});
function initmap(mapbox: string) {
  const baseUrl =
    "https://iserver.supermap.io/iserver/services/map-world/rest/maps/World";
  let state: mapobj = {
    gaiamap: {},
    gaiaSource: {},
    gaiavectorlayer: {},
  };
  let isload = false;
  onMounted(() => {
    state.gaiamap = new Map({
      target: mapbox,
      controls: control.defaults({
        attributionOptions: { collapsed: false, switch: false },
      }),
      view: new View({
        center: [116.31126880645752, 39.974613189697266],
        zoom: 14,
        projection: "EPSG:4326",
      }),
      layers: [
        new TileLayer({
          url: baseUrl,
          layerName: "grape:geotiff_coverage",
          title: "tianLayer",
          source: new TiandituSource({
            layerType: "vec",
          }),
          visible: true,
        }),
        new TileLayer({
          url: baseUrl,
          layerName: "grape:geotiff_coverage",
          title: "tianLayer2",
          source: new TiandituSource({
            isLabel: true,
          }),
          visible: true,
        }),
      ],
    });
    state.gaiaSource = new VectorSource({
      wrapX: false,
    });
    state.gaiavectorlayer = new VectorLayer({
      source: state.gaiaSource,
    });
    state.gaiamap.addLayer(state.gaiavectorlayer);
    console.log(state.gaiamap);

    state.gaiamap.on("click", function (e: any) {
      // console.log("click````````e", e);
    });
    state.gaiamap.on("pointermove", function (t: any) {
      let e = t.map.getEventPixel(t.originalEvent);
      // console.log(e,'pointermove');
    });
    console.log("22222222222222", { ...state });
    isload = true;
    
  });
    return { ...state };
  console.log("1111111111111", { ...state });


}

function addControls(gaiamap: any, gaiaSource: any) {
  const gaiaDraw = new Draw({
    source: gaiaSource,
    type: "point",
    snapTolerance: 20,
  });
  const handaddDraw = () => {
    gaiamap.addInteraction(gaiaDraw);
  };
  return {
    gaiaDraw,
    handaddDraw,
  };
}
</script>
<style lang="scss">
body {
  margin: 0;
  #map {
    width: 100vw;
    height: 100vh;
    margin: 0 auto;
  }
  .controlsbox {
    position: fixed;
    right: 20px;
    top: 20px;
    padding: 5px 15px;
    background-color: aquamarine;
    border-radius: 10px;
    z-index: 2;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
  }
}
</style>