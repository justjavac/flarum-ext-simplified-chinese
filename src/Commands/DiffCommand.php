<?php

namespace Flarum\SimplifiedChinese\Commands;

use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Yaml\Yaml;

class DiffCommand extends Command
{
    /**
     * The base directory of this project.
     *
     * @var string
     */
    protected $baseDir;

    /**
     * Configure current command.
     */
    protected function configure()
    {
        $this->setName("diff:locale")
             ->setDescription("Check the lack of chinese translation.")
             ->setHelp("This command will check the lack of chinese translation by comparing the locales with flarum/flarum-ext-english.");
    }


    /**
     * Execute the current command.
     *
     * @param InputInterface $input
     * @param OutputInterface $output
     *
     * @return int|null|void
     */
    protected function execute(InputInterface $input, OutputInterface $output)
    {
        $this->baseDir  = dirname(dirname(__DIR__));
        $chineseLocales = $this->dotLocales($this->baseDir . '/locale');
        $englishLocales = $this->dotLocales($this->baseDir . '/vendor/flarum/flarum-ext-english/locale');

        $output->writeln("<fg=green>+++++++++++++++++++++++</>");
        foreach ($englishLocales as $key => $value) {
            if ( ! array_key_exists($key, $chineseLocales)) {
                $output->writeln("<fg=green>$key: $value</>");
            }
        }

        $output->writeln("<fg=red>-----------------------</>");
        foreach ($chineseLocales as $key => $value) {
            if ( ! array_key_exists($key, $englishLocales)) {
                $output->writeln("<fg=red>$key: $value</>");
            }
        }
    }

    /**
     * Parse locales and doted the contents.
     *
     * @param $dir
     *
     * @return array
     */
    protected function dotLocales($dir)
    {
        $results = [];
        $dirp    = opendir($dir);
        while ($file = readdir($dirp)) {
            if (preg_match("/.*\.yml/", $file)) {
                $content = Yaml::parse(file_get_contents($dir . '/' . $file));
                $results = array_merge($results, array_dot($content));
            }
        }

        return $results;
    }
}
