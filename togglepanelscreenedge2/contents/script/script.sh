#!/bin/bash
sleep 10;
qdbus org.kde.plasmashell /PlasmaShell evaluateScript "panel = panelById(panelIds[2]); if (panel.height > 0) {panel.height = panel.height * -1;}";
