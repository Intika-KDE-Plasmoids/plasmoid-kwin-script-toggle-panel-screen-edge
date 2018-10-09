/*
*  Copyright 2018 Intika <intika.dev@gmail.com>
*
*  General Public License for more details.
*
*  You should have received a copy of the GNU General Public License
*  along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

var registeredBorders = [];

var togglePanel = function() {
    
    var plasmascript = "panel = panelById(panelIds[3]); panel.height = panel.height * -1; if (panel.location == 'left') {panel.location = 'right'; sleep(10); panel.location = 'left';} if (panel.location == 'top') {panel.location = 'bottum'; sleep(10); panel.location = 'top';} if (panel.location == 'right') {panel.location = 'left'; sleep(10); panel.location = 'right';} if (panel.location == 'bottum') {panel.location = 'top'; sleep(10); panel.location = 'bottum'; } ";


    callDBus("org.kde.plasmashell" , "/PlasmaShell" , "org.kde.PlasmaShell" , "evaluateScript" , plasmascript);
    
    callDBus("org.kde.klauncher5", "/KLauncher", "org.kde.KLauncher","exec_blind", "/home/intika/.local/share/kwin/scripts/togglepanelscreenedge3/contents/script/script.sh", []);

}

function init() {
    for (var i in registeredBorders) {
        unregisterScreenEdge(registeredBorders[i]);
    }

    registeredBorders = [];

    var borders = readConfig("BorderActivate", "").toString().split(",");
    for (var i in borders) {
        var border = parseInt(borders[i]);
        if (isFinite(border)) {
            registeredBorders.push(border);
            registerScreenEdge(border, togglePanel);
        }
    }
}

options.configChanged.connect(init);

init();

