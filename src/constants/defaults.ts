export const defaultNewAddonMessage = `{{?modrinth:
✦ **Modrinth**
**Name**: {{modrinth/name}}
**Description**: {{modrinth/description}}
**Authors**: {{modrinth/authorsUrl}}
**Versions**: {{modrinth/versions}}
**Creation Date**: {{modrinth/created}}
**Categories**: {{modrinth/categories}}
**Client Side**: {{modrinth/clientSide}}
**Server Side**: {{modrinth/serverSide}}
**Modloaders**:  {{modrinth/modloaders}}
|?}}{{?curseforge:
✦ **Curseforge**
**Name**: {{curseforge/name}}
**Description**: {{curseforge/description}}
**Authors**: {{curseforge/authorsUrl}}
**Versions**: {{curseforge/versions}}
**Creation Date**: {{curseforge/created}}
**Categories**: {{curseforge/categories}}
**Client Side**: {{curseforge/clientSide}}
**Server Side**: {{curseforge/serverSide}}
**Modloaders**:  {{curseforge/modloaders}}|?}}`;

export const defaultUpdatedAddonMessage = `{{?modrinth:
✦ **Modrinth**
**Name**: {{names/modrinth}}{{?modrinth/versions/added:
**Versions (Added)**: {{modrinth/versions/added}}|?}}{{?modrinth/versions/removed:
**Versions (Removed)**: {{modrinth/versions/removed}}|?}}{{?modrinth/modloaders/added:
**Modloaders (Added)**: {{modrinth/modloaders/added}}|?}}{{?modrinth/modloaders/removed:
**Modloaders (Removed)**: {{modrinth/modloaders/removed}}|?}}
|?}}{{?curseforge:
✦ **Curseforge**
**Name**: {{names/curseforge}}{{?curseforge/versions/added:
**Versions (Added)**: {{curseforge/versions/added}}|?}}{{?curseforge/versions/removed:
**Versions (Removed)**: {{curseforge/versions/removed}}|?}}{{?curseforge/modloaders/added:
**Modloaders (Added)**: {{curseforge/modloaders/added}}|?}}{{?curseforge/modloaders/removed:
**Modloaders (Removed)**: {{curseforge/modloaders/removed}}|?}}|?}}`;
