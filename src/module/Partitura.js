// importações
const xml = require('xml2js')
const path = require('path')
const fs = require('fs')
const { promises } = require('dns')

// modulo
class Partitura {
    constructor(path) {
        this.path = path
        this.partitura = null
    }

    async inicializar() {
        const path = await this.path
        const data = await fs.promises.readFile(path, 'utf-8')
        const parser = await new xml.Parser()
        const result = await parser.parseStringPromise(data)
        this.partitura = result
    }

    getPartitura() {
        return this.partitura
    }

    transporArmadura(semitons) {        
        let clave = Number(this.partitura['score-partwise']['part'][0]['measure'][0]['attributes'][0]['key'][0]['fifths'][0]);

        // Algoritmo que trasnporta para a clave correta
        clave = clave + semitons
        if(semitons % 2 == 1) {
            clave = clave + 6
        } 

        if (clave > 7) {
            clave = clave - 12
        }

        if (clave < -7) {
            clave = clave + 12
        }
        
        // Atualizando a clave
        this.partitura['score-partwise']['part'][0]['measure'][0]['attributes'][0]['key'][0]['fifths'][0] = clave
        console.log(`Clave: ${semitons} semitons`)
    }

    setInstrumento() {
        // Informações do instrumento
        console.log(this.partitura['score-partwise']['part-list'][0]['score-part'][0]['part-name']) //Nome
        console.log(this.partitura['score-partwise']['part-list'][0]['score-part'][0]['part-abbreviation']) //Abreviação
        console.log(this.partitura['score-partwise']['part-list'][0]['score-part'][0]['score-instrument'][0]['instrument-name']) //Nome
        console.log(this.partitura['score-partwise']['part-list'][0]['score-part'][0]['score-instrument'][0]['instrument-sound']) //Reprodução MIDI
        
        
        // Informações de pauta do instrumento
        console.log(this.partitura['score-partwise']['part'][0]['measure'][0]['attributes'][0]['transpose'][0]['diatonic']) //Escala Diatonica para Transpor
        console.log(this.partitura['score-partwise']['part'][0]['measure'][0]['attributes'][0]['transpose'][0]['chromatic'])
        console.log(this.partitura['score-partwise']['part'][0]['measure'][0]['attributes'][0]['transpose'][0]['octave-change'])


        //Clave
        console.log(this.partitura['score-partwise']['part'][0]['measure'][0]['attributes'][0]['clef'][0]['sign'])
        console.log(this.partitura['score-partwise']['part'][0]['measure'][0]['attributes'][0]['clef'][0]['line'])
    }

    transporNotas(semitons) {
        // Percorre os compassos da partitura
        for (let compassos of this.partitura['score-partwise']['part'][0]['measure']) {
            for (let nota of compassos['note']) {
                if (nota['pitch']) {

                    const cifra = {
                        "C": 0,  // Dó
                        "D": 1,  // Ré
                        "E": 2,  // Mi
                        "F": 3,  // Fá
                        "G": 4,  // Sol
                        "A": 5,  // Lá
                        "B": 6,  // Si
                    };

                    const cifraInvertida = {
                        0: "C" , // Dó
                        1: "D" , // Ré
                        2: "E" , // Mi
                        3: "F" , // Fá
                        4: "G" , // Sol
                        5: "A" , // Lá
                        6: "B" , // Si
                    };
                    
                    let step = nota['pitch'][0]['step'][0]                    
                    let alter = Number(nota['pitch'][0]['alter'] ? nota['pitch'][0]['alter'] : 0 )
                    let octave = Number(nota['pitch'][0]['octave'][0])
                    step = cifra[step]
                    
                    let sem = semitons
                    while (sem > 0) {
                        alter = alter + 1
                        if ((step == 2 || step == 6) && alter == 1) {
                            alter = 0
                            step++
                        }
                        if (alter > 1) {
                            alter = 0
                            step++
                        }
                        if (step > 6) {
                            step = 0
                            octave++
                        }
                        sem--
                    }
                    
                    while (sem < 0) {
                        alter = alter -1
                        if ((step == 3 || step == 0) && alter == -1) {
                            alter = 0
                            step--
                        }
                        if (alter < -1) {
                            alter = 0
                            step--
                        }
                        if (step < 0) {
                            step = 6
                            octave--
                        }
                        sem++
                    }
    
                    // Atualizando a nota
                    nota['pitch'][0]['step'] = cifraInvertida[step]
                    nota['pitch'][0]['alter'] = alter.toString()
                    nota['pitch'][0]['octave'] = octave.toString()
                }
            }
        }
        console.log(`Notas: ${semitons} semitons`)
    }
    
    salvarXML(path) {

        // Converte o objeto modificado para XML
        const builder = new xml.Builder();
        const newXml = builder.buildObject(this.partitura);

        // Salva o novo arquivo
        fs.writeFile(path, newXml, (err) => {
            if (err) {
                console.error("Erro ao salvar:", err);
            } else {
                console.log("Arquivo salvo com sucesso!");
            }
        });
    }
}


module.exports = {Partitura}