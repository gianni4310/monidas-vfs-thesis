
const unsubscribe = await based.db.default.observe(
  {
    $alias: 'sensor-001',
    fields: {
      isActive: true,
      thresholds: {
        $list: {},
        limit: true,
        unit: true,
      },
    },
  },
  (updatedSensor) => {
    console.log('Sensor aktualisiert:', updatedSensor);
  }
);

// Zum Beenden der Subscription:
unsubscribe();
