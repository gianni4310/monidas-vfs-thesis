
const { id: sensorId } = await based.db.default.set({
  type: 'Sensor',
  name: 'Temperatursensor A1',
  isActive: true,
  location: {
    $ref: { $alias: 'location-001' },
  },
  thresholds: {
    $add: [
      { type: 'Threshold', limit: 25, unit: '°C' },
      { type: 'Threshold', limit: 30, unit: '°C' },
    ],
  },
});
