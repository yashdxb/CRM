import fs from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();

const targets = [
  {
    file: path.join(
      projectRoot,
      'node_modules/expo/node_modules/expo-constants/ios/EXConstants.podspec'
    ),
    search:
      ':script => "bash -l -c \\"#{env_vars}$PODS_TARGET_SRCROOT/../scripts/get-app-config-ios.sh\\""',
    replace:
      ':script => "bash -l \\"$PODS_TARGET_SRCROOT/../scripts/get-app-config-ios.sh\\""',
  },
  {
    file: path.join(projectRoot, 'ios/Pods/Local Podspecs/EXConstants.podspec.json'),
    search:
      '"script": "bash -l -c \\"$PODS_TARGET_SRCROOT/../scripts/get-app-config-ios.sh\\""',
    replace:
      '"script": "bash -l \\"$PODS_TARGET_SRCROOT/../scripts/get-app-config-ios.sh\\""',
  },
  {
    file: path.join(projectRoot, 'ios/Pods/Pods.xcodeproj/project.pbxproj'),
    search:
      'shellScript = "bash -l -c \\"$PODS_TARGET_SRCROOT/../scripts/get-app-config-ios.sh\\"";',
    replace:
      'shellScript = "bash -l \\"$PODS_TARGET_SRCROOT/../scripts/get-app-config-ios.sh\\"";',
  },
  {
    file: path.join(projectRoot, 'ios/NorthEdgeCRM.xcodeproj/project.pbxproj'),
    search:
      '`\\"$NODE_BINARY\\" --print \\"require(\'path\').dirname(require.resolve(\'react-native/package.json\')) + \'/scripts/react-native-xcode.sh\'\\"`\\n\\n',
    replace:
      'SCRIPT_PATH=\\"$($NODE_BINARY --print \\"require(\'path\').dirname(require.resolve(\'react-native/package.json\')) + \'/scripts/react-native-xcode.sh\'\\")\\"\\n\\"$SCRIPT_PATH\\"\\n\\n',
  },
  {
    file: path.join(projectRoot, 'node_modules/expo/scripts/xcode/with-environment.sh'),
    search: '  $1',
    replace: '  "$1"',
  },
];

let changedCount = 0;

for (const target of targets) {
  if (!fs.existsSync(target.file)) {
    continue;
  }

  const original = fs.readFileSync(target.file, 'utf8');
  if (!original.includes(target.search) || original.includes(target.replace)) {
    continue;
  }

  const updated = original.replace(target.search, target.replace);
  if (updated !== original) {
    fs.writeFileSync(target.file, updated, 'utf8');
    changedCount += 1;
  }
}

if (changedCount > 0) {
  console.log(`[fix-ios-space-paths] patched ${changedCount} file(s)`);
}
