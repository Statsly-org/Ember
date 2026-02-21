# EPERM / trace-Fehler auf Windows

Wenn `yarn dev` mit **EPERM: operation not permitted, open '.next\trace'** abbricht:

## Lösung 1: Windows Developer Mode (empfohlen)

1. **Einstellungen** → **Datenschutz & Sicherheit** → **Für Entwickler**
2. **Entwicklermodus** aktivieren
3. PC neu starten
4. `yarn dev` erneut ausführen

## Lösung 2: Projekt verschieben

Projekt in einen Ordner ohne Leerzeichen und außerhalb von Downloads verschieben:

```
C:\Users\jvonm\Downloads\Ember Web   ❌
C:\Dev\EmberWeb                       ✅
```

## Lösung 3: Antivirus / OneDrive

- Projektordner in Windows Defender-Ausnahmen aufnehmen
- OneDrive-Sync für den Projektordner deaktivieren (falls aktiv)

## Lösung 4: Vor dem Start aufräumen

Alle Terminals schließen, dann:

```powershell
Remove-Item -Recurse -Force apps\web\.next -ErrorAction SilentlyContinue
yarn dev
```
