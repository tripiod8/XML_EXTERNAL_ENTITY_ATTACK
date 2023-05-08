<?php
    libxml_disable_entity_loader(false);

    $xmlfile = file_get_contents($_FILES["thefile"]["tmp_name"]);
    $dom = new DOMDocument();
    $dom->load($_FILES["thefile"]["tmp_name"]);

    $parser = xml_parser_create('UTF-8');

    function externalEntityRefHandler($parser, $openEntityNames, $base, $systemId, $publicId) 
    {
        global $externalEntities;
    
        if (!empty($systemId)) {
            $externalEntities[$openEntityNames] = @file_get_contents($systemId);
        }
    
        return (integer) (
            !empty($publicId)
            || !empty($externalEntities[$openEntityNames])
        );
    }

    xml_set_external_entity_ref_handler($parser, "externalEntityRefHandler");

    if (xml_parse($parser, $xmlfile, true) === 1) {
        echo $externalEntities['xxe'];
    }
    
?>