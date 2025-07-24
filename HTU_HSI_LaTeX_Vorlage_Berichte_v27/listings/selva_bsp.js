// Organization mit Alias erstellen
const res = await set({
  alias: 'fhnw-brugg',
  type: 'Organization',
  name: 'FHNW Brugg',
});

// Zugriff auf die Organization über die erzeugte ID
const orgViaId = await get({
  $id: res.id,
  fields: { name: true },
});

// Zugriff auf die Organization alternativ über Alias
const orgViaAlias = await get({
  $alias: 'fhnw-brugg',
  fields: { name: true },
});

// Änderungen an der Organization in Echtzeit überwachen
const unsubscribe = await observe({
  $alias: 'fhnw-brugg',
  fields: { name: true },
}, (updatedOrg) => {
  console.log('Organisation aktualisiert:', updatedOrg);
});

// Beobachtung beenden
unsubscribe();

// ID mit externem Alias generieren
const id1 = await client.id({ type: 'Organization', externalId: 'default' });

// Neues Objekt mit der generierten ID erstellen
await set({
  $id: id1,
  name: 'FHNW Muttenz',
});

// Die Organisation "FHNW Muttenz" löschen
await client.delete(id1);
