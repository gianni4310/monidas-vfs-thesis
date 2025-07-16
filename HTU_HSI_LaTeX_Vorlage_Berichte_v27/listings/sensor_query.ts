
const sensorData = await based.db.default.get({
  $alias: 'sensor-001',
  fields: {
    name: true,
    isActive: true,
    location: {
      description: true,
      latitude: true,
      longitude: true,
    },
    thresholds: {
      $list: {},
      limit: true,
      unit: true,
    },
  },
});
