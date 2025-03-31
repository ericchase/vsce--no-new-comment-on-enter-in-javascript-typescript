import { Builder } from './lib/Builder.js';
import { Processor_BasicWriter } from './lib/processors/FS-BasicWriter.js';
import { Processor_HTML_CustomComponent } from './lib/processors/HTML-CustomComponent.js';
import { Processor_HTML_ImportConverter } from './lib/processors/HTML-ImportConverter.js';
import { Processor_TypeScript_GenericBundlerImportRemapper } from './lib/processors/TypeScript-GenericBundler-ImportRemapper.js';
import { module_script, Processor_TypeScript_GenericBundler, ts_tsx_js_jsx } from './lib/processors/TypeScript-GenericBundler.js';
import { Step_Bun_Run } from './lib/steps/Bun-Run.js';
import { Step_CleanDirectory } from './lib/steps/FS-CleanDirectory.js';
import { Step_Format } from './lib/steps/FS-Format.js';
import { Processor_JavaScript_Rollup } from './Processor-JavaScript-Rollup.js';
import { Step_NPM_InstallDependencies } from './Step-NPM-InstallExtensionDependencies.js';
import { Step_VSCE_Package } from './Step-VSCE-Package.js';

const builder = new Builder(Bun.argv[2] === '--watch' ? 'watch' : 'build');

builder.setStartUpSteps(
  Step_Bun_Run({ cmd: ['bun', 'install'] }, 'quiet'),
  Step_CleanDirectory(builder.dir.out),
  Step_Format('quiet'),
  //
);

builder.setBeforeProcessingSteps();

builder.setProcessorModules(
  Processor_HTML_CustomComponent(),
  Processor_HTML_ImportConverter(),
  Processor_TypeScript_GenericBundler({ external: ['vscode'], sourcemap: 'none', target: 'node' }),
  Processor_TypeScript_GenericBundlerImportRemapper(),
  Processor_JavaScript_Rollup({ external: ['vscode'] }),
  // all files except for .ts and lib files
  Processor_BasicWriter(['**/*'], [`**/*${ts_tsx_js_jsx}`, `${builder.dir.lib.standard}/**/*`]),
  // all module and script files
  Processor_BasicWriter([`**/*${module_script}${ts_tsx_js_jsx}`], []),
  //
);

builder.setAfterProcessingSteps();

builder.setCleanUpSteps(
  Step_NPM_InstallDependencies(),
  Step_VSCE_Package('release'),
  //
);

await builder.start();
