import asyncio
import os
import edge_tts

VOICE = "pt-BR-AntonioNeural" # Voz neural solene, profunda e expressiva de narrador brasileiro

TEXTS = {
    "lenda_lagoa.mp3": """Lagoa das Lágrimas. Relato de Nivaldo Krüger.

Atualmente, a Lagoa está situada em um espaço em que havia um vale profundo. Há muitos anos, os índios Dorin se preparavam para um combate contra os inimigos, os Votorão.

O cacique dos Dorin, jovem e valente, escondia nesse vale crianças, mulheres e anciãos. Contudo, ao se despedir da noiva, ele disse: "vou honrar a coragem de nossa gente, me espere aqui, voltarei para casarmos e termos muitos filhos".

Durante o combate os Dorin venceram, porém o cacique morreu como um guerreiro valente. Assim, a tribo retornou ao sertão da Serra da Esperança. Entretanto, a noiva ficou esperando o cacique que havia prometido voltar. Assim sendo, deprimida sobre uma laje, ela chorou desconsolada e fiel.

Por fim, alguns invernos mais tarde, os Dorin encontraram nas fendas da laje duas vertentes de águas cristalinas. Assim nasceu a Lagoa das Lágrimas, um espelho d’água que sempre irá refletir essa história, como um símbolo de fidelidade da mulher pelo amor que nunca será esquecido.""",

    "lenda_degolado.mp3": """Capela do Degolado. Tradição Popular de Guarapuava.

Um dos marcos mais misteriosos de Guarapuava, a Capela do Degolado guarda a memória de um jovem soldado que, em tempos de conflito, teria desertado em busca de refúgio. Confundido injustamente com um criminoso após buscar comida em uma fazenda, o jovem foi capturado e teve um fim trágico nas proximidades da atual Rua General Carneiro.

A lenda afirma que, por ter sido vítima de uma injustiça fatal, o soldado tornou-se um santo popular. Com o passar das décadas, a pequena capela construída no local da sua morte tornou-se um ponto de intensa devoção.

Relatos de milagres e fenômenos sobrenaturais — como o vulto do soldado zelando pela região e o curioso fato de imagens deixadas no local aparecerem sem a cabeça — mantêm viva a chama desta história que mistura fé, tragédia e o folclore guarapuavano.""",

    "lenda_serpente.mp3": """A Serpente da Lagoa. Tradição Oral de Guarapuava.

Durante o século vinte, uma história curiosa começou a circular entre mães e professores para evitar que as crianças faltassem às aulas: a existência de uma serpente gigante que dormia entre a Catedral e a Lagoa das Lágrimas.

A versão mais famosa dizia que o despertar da fera ocorreria com a inauguração da estação ferroviária; o apito do primeiro trem a enfureceria, fazendo-a destruir a cidade. Quando o trem chegou e nada aconteceu, a lenda se adaptou: diziam agora que, se a antiga Catedral fosse demolida para a construção de uma nova, o animal acordaria.

Curiosamente, essa crença popular foi tão forte que ajudou a interromper planos de demolição da igreja na época. Assim, entre o medo e o respeito à tradição, a Catedral permaneceu de pé e Guarapuava seguiu salva da fúria da serpente, que — segundo contam os antigos — continua em seu sono profundo sob nossas águas.""",

    "lenda_belmiro.mp3": """Belmiro de Miranda: O Construtor da Liberdade. Fonte: Academia de Letras, Artes e Ciências de Guarapuava.

Abolicionista e construtor histórico de Guarapuava, Belmiro de Miranda nasceu em Alagoas em 1825, filho da escrava Lucinda, comprada na costa leste da África.

De profissão mestre de obras e exímio em taipa de pilão, foi trazido a Guarapuava pelo bandeirante Pedro de Siqueira Côrtes para erguer o primeiro palacete da cidade, no pátio da Matriz. Homem de constituição robusta e extraordinária inteligência para os serviços de pedreiro e carpinteiro, Belmiro obteve a rara permissão de trabalhar para terceiros aos domingos, dias santificados e em noites enluaradas, das 22h às 24h.

Com trabalho árduo e o fruto do seu suor, acumulou o dinheiro necessário para comprar a própria alforria. Em 1880, conseguiu recursos para libertar também sua futura esposa, Ezidia Efigênia. Ao lado de Ezidia, exímia cozinheira, passou a investir cada centavo na libertação de antigos companheiros, conquistando a alforria de mais de 50 escravizados em Guarapuava e orientando-os na vida em liberdade.

Mesmo sem saber ler ou escrever, Belmiro mantinha contínua correspondência com o líder abolicionista nacional José do Patrocínio através de amigos. Decorava palavra por palavra das cartas recebidas para discursar ao povo nas senzalas e em praça pública, mantendo acesa a chama da liberdade.

Em 13 de maio de 1888, recebeu por telégrafo a sonhada notícia da Abolição da Escravatura no Brasil e organizou grandes festejos cívicos ao lado do Visconde de Guarapuava. Posteriormente, fundou o pioneiro Hotel do Comércio e criou o Caixão da Misericórdia para garantir sepultamento digno e gratuito aos indigentes.

Belmiro de Miranda faleceu em 1910, deixando o legado eterno de um homem que deixou de ser cativo de um senhor para tornar-se cativo do ideal de servir à humanidade."""
}

async def generate():
    out_dir = os.path.join(os.getcwd(), "assets", "audio", "lendas")
    os.makedirs(out_dir, exist_ok=True)
    
    for filename, text in TEXTS.items():
        out_path = os.path.join(out_dir, filename)
        print(f"Gerando audio neural para: {filename}...")
        communicate = edge_tts.Communicate(text, VOICE, rate="-4%", pitch="+0Hz")
        await communicate.save(out_path)
        size_kb = os.path.getsize(out_path) / 1024
        print(f"[OK] Concluido: {filename} ({size_kb:.1f} KB)")

if __name__ == "__main__":
    asyncio.run(generate())
