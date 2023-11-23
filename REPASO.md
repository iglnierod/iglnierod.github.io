# REPASO UD1 - FICHEROS

## [APUNTES](https://mp0486-acceso-datos-losada.vercel.app/docs/unidades/01/)

### - - PARTES DE CÓDIGO - -

#### Ejercicio 103 - Filtrar y listar por extension

```` java
public class FiltrarNombre implements FilenameFilter {
    public static void main(String[] args) {
        FiltrarNombre fn = new FiltrarNombre();
        fn.filtrar("C:\\Users\\dam2_alu08\\Downloads\\", ".pdf");
    }

    void filtrar(String ruta, String extension) {
        File directorio = new File(ruta);
        List<File> ficheros = new LinkedList<>();
        for (String item : directorio.list()) {
            File f = new File(item);
            if (accept(f, extension)) {
                ficheros.add(f);
            }
        }
        System.out.println(ficheros);
    }

    @Override
    public boolean accept(File dir, String name) {
        return dir.getName().endsWith(name);
    }
}
````

#### Ejercicio 104 - Filtrar y listar por tamaño

```` java
public class FiltrarTamano implements FilenameFilter {

    public static void main(String[] args) {
        FiltrarTamano ft = new FiltrarTamano();
        ft.filtrar("C:\\Users\\dam2_alu08\\Downloads\\", 0);
    }

    void filtrar(String ruta, float minTamano) {
        File directorio = new File(ruta);
        List<File> ficheros = new LinkedList<>();
        for (String item : directorio.list()) {
            File f = new File(ruta, item);
            if (f.length() >= minTamano) {
                ficheros.add(f);
            }
        }
        for(File f : ficheros) {
            System.out.println(f.getName() + " [" + f.length() + " bytes]");
        }
    }

    @Override
    public boolean accept(File dir, String name) {
        return false;
    }
}
````

#### Ejercicio 105 (Binario) / Ejercicio 106 (Texto) - Métodos:

##### Escribir en fichero:

###### FileOutputStream

```` java
public void escribir(String texto) {
        try {
            FileOutputStream fos = new FileOutputStream(fichero);
            char[] charTexto = texto.toCharArray();
            for (int i = 0; i < charTexto.length; i++) {
                fos.write(charTexto[i]);
            }
            System.out.println("Se ha escrito el texto: '" + texto + "' en el fichero: " + fichero.getName());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
````

###### FileWriter

````java
    public void escribir(String texto) {
        try (FileWriter fs = new FileWriter(fichero, true)) {
            fs.write(texto);
            System.out.println("Se ha escrito el texto '" + texto + "' en el fichero: " + fichero);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
````

##### Leer contenido del fichero:

###### FileInputStream

````java
public void leer() {
        try {
            FileInputStream fis = new FileInputStream(fichero);
            int len = fis.available();
            char[] texto = new char[len];
            for (int i = 0; i < len; i++) {
                byte x = (byte) fis.read();
                char caracter = (char) x;
                texto[i] = caracter;
            }
            System.out.print("El texto del fichero: " + fichero.getName() + " es: ");
            for (char c :
                    texto) {
                System.out.print(c);
            }
            System.out.println();
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
````

###### FileReader

````java
    public void leer() {
        try (FileReader fr = new FileReader(fichero)) {
            System.out.print("El fichero " + fichero + " contiene el siguiente texto: ");
            byte b;
            while ((b = (byte) fr.read()) != -1) {
                System.out.print((char) b);
            }
            System.out.println();
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
````

##### Copiar contenido a otro fichero:

###### FileInputStream / FileOutputStream

````java
    public void copiar(FicheroBinario ficheroDestino) {
        try {
            FileInputStream fis = new FileInputStream(fichero);
            FileOutputStream fos = new FileOutputStream(ficheroDestino.getFichero());

            int len = fis.available();
            char[] caracteres = new char[len];
            for(int i = 0; i < len; i++) {
                caracteres[i] = (char) ((byte) fis.read());
                fos.write(caracteres[i]);
            }

            System.out.println("Se ha copiado el texto del fichero: " + fichero + " a " + ficheroDestino.getFichero());
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
````

#### Ejercicio 108 - Serializar objeto

##### Escribir objeto:

````java
    public void escribirPersonaEnFichero(Persona persona, File fichero) {
        try (FileOutputStream fos = new FileOutputStream(fichero)) {
            ObjectOutputStream oos = new ObjectOutputStream(fos);
            oos.writeObject(persona);
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
````

##### Leer objeto:

````java
    public Persona leerPersonaDeFichero(File fichero) {
        Persona p = new Persona();
        try (FileInputStream fis = new FileInputStream(fichero)) {
            ObjectInputStream ois = new ObjectInputStream(fis);
            p = (Persona) ois.readObject();
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (ClassNotFoundException e) {
            throw new RuntimeException(e);
        }
        return p;
    }
````

#### Ejercicio 109 - Copiar contenido de archivo:

````java
public class CopiaFichero {
    public static void main(String[] args) {
        String rutaDir = new File("").getAbsolutePath() + "\\dir\\";
        Path origen = Paths.get(rutaDir + "origen.txt");
        Path destino = Paths.get(rutaDir + "destino.txt");
        try {
            FileInputStream in = new FileInputStream(origen.toFile());
            Files.copy(in, destino, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("Se ha copiado el texto del archivo origen.txt a destino.txt");
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
````

#### Ejercicio 110 - Mover fichero + cambiarle nombre:

````java
public class MoverFichero {
    public static void main(String[] args) {
        String rutaDir = new File("").getAbsolutePath() + "\\dir\\";
        Path origen = Paths.get(rutaDir + "origen.txt");
        Path destino = Paths.get(rutaDir + "\\subdirectorio\\destino-sub.txt");
        try {
            Files.move(origen, destino, StandardCopyOption.REPLACE_EXISTING);
            System.out.println("Se ha movido el archivo " + origen.toFile() + " a " + destino.toFile().getAbsolutePath());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}
````

#### Ejercicio 112 - Leer archivo XML:

###### Archivo XML

````xml
<?xml version="1.0" encoding="UTF-8"?>
<peliculas>
  <pelicula id="1">
    <titulo>El señor de los anillos</titulo>
    <ano>1999</ano>
    <precio>19.99</precio>
  </pelicula>
  <pelicula id="2">
    <titulo>Star Wars</titulo>
    <ano>2005</ano>
    <precio>12.50</precio>
  </pelicula>
  <pelicula id="3">
    <titulo>Harry Potter</titulo>
    <ano>2001</ano>
    <precio>8.25</precio>
  </pelicula>
</peliculas>
````

###### Código Java

````java
import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;
import org.xml.sax.SAXException;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import java.io.File;
import java.io.IOException;

public class LeerPeliculasXML {
    public static void main(String[] args) {
        try {
            DocumentBuilderFactory dbFactory = DocumentBuilderFactory.newInstance();
            DocumentBuilder dBuilder = dbFactory.newDocumentBuilder();
            File archivoXML = new File("peliculas.xml");
            Document doc = dBuilder.parse(archivoXML);
            doc.getDocumentElement().normalize();
            System.out.println("Root element :" + doc.getDocumentElement().getNodeName());
            NodeList nList = doc.getElementsByTagName("pelicula");
            System.out.println("----------------------------");
            for (int temp = 0; temp < nList.getLength(); temp++) {
                Node nNode = nList.item(temp);
                if (nNode.getNodeType() == Node.ELEMENT_NODE) {
                    Element eElement = (Element) nNode;
                    String id = eElement.getAttribute("id");
                    System.out.println("\n" + nNode.getNodeName().toUpperCase() + " #" + id + ":");
                    System.out.println("Título: "+ eElement.getElementsByTagName("titulo").item(0).getTextContent());
                    System.out.println("Año: "+ eElement.getElementsByTagName("ano").item(0).getTextContent());
                    System.out.println("Precio: "+ eElement.getElementsByTagName("precio").item(0).getTextContent());
                }
            }
        } catch (ParserConfigurationException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        } catch (SAXException e) {
            throw new RuntimeException(e);
        }
    }
}
````

#### Ejercicio 113 - Escribir XML

###### XML a escribir

````xml
<?xml version="1.0" encoding="UTF-8"?>
<peliculas>
  <pelicula id="1">
    <titulo>El señor de los anillos</titulo>
    <ano>1999</ano>
    <precio>19.99</precio>
  </pelicula>
  <pelicula id="2">
    <titulo>Star Wars</titulo>
    <ano>2005</ano>
    <precio>12.50</precio>
  </pelicula>
  <pelicula id="3">
    <titulo>Harry Potter</titulo>
    <ano>2001</ano>
    <precio>8.25</precio>
  </pelicula>
</peliculas>
````

###### Código Java

````java

import org.w3c.dom.Document;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import java.io.File;

public class EscribirPeliculasXML {
    public static String pathXMLFiles = new File("").getAbsolutePath() + "\\XML\\";

    public static void main(String[] args) {
        File sourceFile = new File(pathXMLFiles + "peliculas.xml");

        try {
            DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            DocumentBuilder builder = factory.newDocumentBuilder();
            Document document = builder.parse(sourceFile);
            transform(document);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    public static void transform(Document document) {
        try {
            TransformerFactory factory = TransformerFactory.newInstance();
            Transformer transformer = factory.newTransformer();

            DOMSource source = new DOMSource(document);
            File destinationFile = new File(pathXMLFiles + "copiaPeliculas.xml");
            StreamResult result = new StreamResult(destinationFile);

            transformer.transform(source, result);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }


    }
}
````

#### Ejercicio 116:

````java
public class Main {
    public static void main(String[] args) {
        try (Scanner sc = new Scanner(System.in)) {
            System.out.print("Introduce una vocal: ");
            char vocal = sc.next().charAt(0);
            System.out.println(vocal);

            try (BufferedReader br = new BufferedReader(new FileReader("refranes.txt"));
                 BufferedWriter bw = new BufferedWriter(new FileWriter("refranes_CON_" + vocal + ".txt"))) {

                String linea;
                while ((linea = br.readLine()) != null) {
                    linea = cambiarVocales(linea, vocal);
                    System.out.println(linea);
                    bw.write(linea);
                    bw.newLine();
                }
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
    }

    private static String cambiarVocales(String input, char vowel) {
        char lowerVowel = Character.toLowerCase(vowel);
        String vocales = "[aeiou]";
        String vocalesMayusculas = String.valueOf(Character.toUpperCase(vowel));
        return input.replaceAll(vocales, String.valueOf(lowerVowel)).replaceAll(vocales.toUpperCase(), vocalesMayusculas);
    }
}
````

#### Ejercicio 119 - Comprimir a .zip

````java
    public void crearZIP() {
        String rutaParent = this.ruta.getParent();
        String zipName = this.ruta.getName() + ".zip";
        this.zip = new File(rutaParent, zipName);
        try {
            this.zip.createNewFile();
            FileOutputStream fos = new FileOutputStream(zip);
            ZipOutputStream zipOut = new ZipOutputStream(fos);
            System.out.println("~~~~~~~~ Añadiendo archivos... ~~~~~~~~");
            for (File f : ruta.listFiles()) {
                agregarAZip(f, f.getName(), zipOut);
                System.out.println("Se ha añadido al archivo '" + zip.getName() + "' el " + (f.isDirectory() ? "directorio" : "archivo") +  ": " + f.getName());
            }
            zipOut.close();
            fos.close();
            System.out.println("Completada la compresión del directorio " + ruta.getName() + " a .zip");
            System.out.println("La ruta del nuevo archivo comprimido es: " + zip.getAbsolutePath());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

    }


    public void agregarAZip(File fileToZip, String fileName, ZipOutputStream zipOut) {
        try {
            if (fileToZip.isDirectory()) {
                String folderName = fileName.endsWith("/") ? fileName : (fileName + "/");
                zipOut.putNextEntry(new ZipEntry(folderName));
                zipOut.closeEntry();

                File[] children = fileToZip.listFiles();
                for (File childFile : children) {
                    agregarAZip(childFile, fileName + "/" + childFile.getName(), zipOut);
                }
                return;
            }

            FileInputStream fis = new FileInputStream(fileToZip);
            ZipEntry zipEntry = new ZipEntry(fileName);
            zipOut.putNextEntry(zipEntry);
            byte[] bytes = new byte[1024];
            int lenght;
            while ((lenght = fis.read(bytes)) >= 0) {
                zipOut.write(bytes, 0, lenght);
            }
            fis.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
````

#### Ejercicio 120 - XML a JSON

````xml
        <!-- https://mvnrepository.com/artifact/org.json/json -->
        <dependency>
            <groupId>org.json</groupId>
            <artifactId>json</artifactId>
            <version>20231013</version>
        </dependency>
````

````java
import org.json.JSONException;
import org.json.JSONObject;
import org.json.XML;

import java.io.*;

public class XmlToJson {
    static final String PROJECT_PATH = new File("").getAbsolutePath();

    public static void main(String[] args) {
        try (BufferedReader reader = new BufferedReader(new FileReader(new File(PROJECT_PATH, "\\files\\bookstore.xml")));
             BufferedWriter writer = new BufferedWriter(new FileWriter(new File(PROJECT_PATH, "\\files\\bookstore.json")))) {

            StringBuilder sb = new StringBuilder();
            String line = null;

            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }
            reader.close();

            String xmlEntrada = sb.toString();

            JSONObject json = XML.toJSONObject(xmlEntrada);
            String jsonString = json.toString(4);
            writer.write(jsonString);
            System.out.println("Se ha convertido el archivo correctamente.");
            System.out.println(jsonString);
        } catch (IOException | JSONException e) {
            throw new RuntimeException(e);
        }
    }
}
````