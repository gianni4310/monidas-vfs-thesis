
const sensorData = await get({
  $alias: 'sensor-001',
  name: true,
  isActive: true,
  location: {
    description: true,
    latitude: true,
    longitude: true,
  },
  thresholds: {
    limit: true,
    unit: true,
    $list: {
      $sort: {
        $field: 'slug',
        $order: 'asc',
      },
    },
  },
});
