import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import WebView from 'react-native-webview';
import {Colors, Spacing, Typography} from '../../theme';
import type {MerchantPenguasaanData} from '../../types';
import {LEAFLET_JS, LEAFLET_CSS} from '../../utils/leafletBundle';

interface Props {
  data: MerchantPenguasaanData;
}

const TIPE_COLOR: Record<string, string> = {
  kopra: '#074DB6',
  edc:   '#6FAEFC',
  lm:    '#A2CFFF',
  belum: '#6A727D',
};

function buildHtml(data: MerchantPenguasaanData): string {
  const markersJson = JSON.stringify(
    data.markers.map(m => ({
      lat: m.lat,
      lng: m.lng,
      color: TIPE_COLOR[m.tipe] ?? '#999999',
    }))
  );

  return `<!DOCTYPE html>
<html>
<head>
<meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
<style>${LEAFLET_CSS}
*{margin:0;padding:0;box-sizing:border-box}
html,body,#map{width:100%;height:100%}
</style>
</head>
<body>
<div id="map"></div>
<script>${LEAFLET_JS}</script>
<script>
(function(){
  var map = L.map('map',{center:[-6.1265,106.7915],zoom:15,zoomControl:true,attributionControl:false});
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19}).addTo(map);
  var markers = ${markersJson};
  markers.forEach(function(m){
    L.circleMarker([m.lat,m.lng],{radius:7,fillColor:m.color,color:'#FFFFFF',weight:2,fillOpacity:1}).addTo(map);
  });
})();
</script>
</body>
</html>`;
}

export function MerchantPenguasaanCard({data}: Props) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Penguasaan Teritori</Text>

      <View style={styles.legendRow}>
        {data.legend.map((item, idx) => (
          <View key={idx} style={styles.legendItem}>
            <View style={[styles.legendDot, {backgroundColor: item.warna}]} />
            <Text style={styles.legendLabel}>{item.label}</Text>
          </View>
        ))}
      </View>

      <View style={styles.mapWrapper}>
        <WebView
          style={styles.map}
          source={{html: buildHtml(data)}}
          originWhitelist={['*']}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginHorizontal: Spacing.base,
    marginTop: Spacing.base,
    backgroundColor: Colors.surfaceLight,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.sm,
    gap: Spacing.sm,
  },
  title: {
    fontSize: Typography.fontSize.sm,
    fontWeight: '700',
    color: Colors.textPrimary,
  },
  legendRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.textSecondary,
  },
  mapWrapper: {
    borderRadius: 8,
    overflow: 'hidden',
    height: 220,
  },
  map: {
    flex: 1,
  },
});
