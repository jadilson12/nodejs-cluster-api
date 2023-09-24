import Clusters from "./clusters";
import ServerNative from "./native/serverNative";

function bootstarp() {
  ServerNative.start();
}

Clusters.clustmize(bootstarp);
