<template>
  <div class="about">
    <h2>{{ msg }}</h2>
    <div class="mapbox">
      <div >+</div>
      <div id="map"></div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, onMounted, ref, toRefs } from "vue";

//地图相关信息
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import * as control from "ol/control";
import { TileSuperMapRest } from "@supermap/iclient-ol";
import TiandituSource from "../assets/map/tianditu";

export default defineComponent({
  setup() {
    const msg = ref("surpermap iclient  for openlayers");

    onMounted(() => {
      initmap("map");
    });
    return {
      msg,
    };
  },
});
//初始化地图
function initmap(mapbox: string) {
  const baseUrl =
    "https://iserver.supermap.io/iserver/services/map-world/rest/maps/World";
  var map = new Map({
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
  map.on("click", function (e) {
    // console.log("click````````e", e);
  });
  map.on("pointermove", function (t) {
    let e = t.map.getEventPixel(t.originalEvent);
    // console.log(e,'pointermove');
  });
}
</script>
<style lang="scss">
#map {
  width: 80vw;
  height: 70vh;
  margin: 0 auto;
}
</style>