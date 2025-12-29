import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error('DATABASE_URL não está definida no arquivo .env');
}

const parsedUrl = new URL(url);
const sslMode = parsedUrl.searchParams.get('sslmode');
const isLocalHost =
  ['localhost', '127.0.0.1'].includes(parsedUrl.hostname) ||
  parsedUrl.hostname.endsWith('.local');
const useSSL =
  sslMode === 'require' ||
  (sslMode !== 'disable' && sslMode !== 'false' && !isLocalHost);

const pool = new Pool({
  connectionString: url,
  ssl: useSSL ? { rejectUnauthorized: false } : false,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Iniciando seed...');

  
  await prisma.posts.deleteMany();

  
  const article1 = await prisma.posts.create({
    data: {
      slug: 'avanco-tecnologia-ia-2025',
      title: 'O Avanço da Inteligência Artificial em 2025: O que esperar das novas IAs Generativas',
      summary: 'Especialistas apontam que a integração da IA em fluxos de trabalho cotidianos atingirá um novo patamar de autonomia este ano.',
      content: `
        <p class="mb-4">O ano de 2025 marca um ponto de inflexão na história da tecnologia. A Inteligência Artificial deixou de ser uma ferramenta de suporte para se tornar o motor central de inovação em diversos setores.</p>
        <p class="mb-4">Segundo analistas do Vale do Silício, a "terceira onda" da IA generativa foca agora em agentes autônomos que não apenas respondem a comandos, mas antecipam necessidades complexas dos usuários.</p>
        <p class="mb-4">"Estamos saindo da era do chat para a era da ação", afirma Maria Silva, pesquisadora sênior. No Brasil, empresas de tecnologia já reportam ganhos de produtividade de até 40% com a adoção de sistemas híbridos.</p>
        <p class="mb-4">Entretanto, o debate sobre ética e regulação continua intenso no Congresso Nacional, com novas diretrizes previstas para serem votadas no próximo trimestre.</p>
      `,
      author: 'Karla Duarte Ferreira',
      publish_date: '27 de Dezembro de 2025',
      category: 'Tecnologia',
      image_url: 'https://images.unsplash.com/photo-1746286720984-72f386e1872e?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  });

  const article2 = await prisma.posts.create({
    data: {
      slug: 'economia-brasileira-crescimento',
      title: 'Economia brasileira apresenta crescimento acima do esperado no último trimestre',
      summary: 'PIB surpreende analistas com alta impulsionada pelo setor de serviços e agronegócio, gerando otimismo para o início de 2025.',
      content: `
        <p class="mb-4">Os dados mais recentes do IBGE revelam um cenário econômico resiliente para o Brasil. O crescimento de 1,2% no último trimestre superou as expectativas mais otimistas do mercado financeiro.</p>
        <p class="mb-4">O agronegócio, beneficiado por safras recordes e demanda internacional aquecida, foi um dos principais pilares. Paralelamente, o setor de serviços demonstrou uma recuperação vigorosa após as reformas estruturais recentes.</p>
        <p class="mb-4">O Ministro da Fazenda declarou que o resultado é fruto de uma política fiscal equilibrada e do aumento da confiança do investidor estrangeiro.</p>
        <p class="mb-4">Apesar dos números positivos, o Banco Central mantém a cautela em relação à taxa de juros, monitorando de perto a inflação dos alimentos.</p>
      `,
      author: 'Karla Duarte Ferreira',
      publish_date: '28 de Dezembro de 2025',
      category: 'Economia',
      // Foto premium do Unsplash para Economia
      image_url: 'https://plus.unsplash.com/premium_photo-1668014840685-a3f9b2d14e01?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  });

  const article3 = await prisma.posts.create({
    data: {
      slug: 'projeto-viaable-malta-reabilitacao-inclusiva',
      title: 'ViaAble: A união entre reabilitação e afeto para famílias especiais em Malta',
      summary: 'Fundado por Jana Laurová e com a expertise da educadora Ana Elisa Tubino, o projeto oferece estadias de reabilitação que priorizam a dignidade e o bem-estar emocional.',
      content: `
        <p class="mb-4">O projeto ViaAble, que hoje atua em Malta, nasceu da resiliência de sua fundadora, <strong>Jana Laurová</strong>. Mãe de duas crianças com autismo e sobrevivente de um câncer, Jana transformou sua experiência pessoal de isolamento e rejeição em uma rede de apoio global. Com uma trajetória que inclui prêmios da OTAN e vasta experiência médica militar, ela traz para o projeto um rigor profissional unido a uma sensibilidade rara.</p>
        
        <p class="mb-4">Ao lado da educadora brasileira <strong>Ana Elisa Tubino</strong>, a ViaAble oferece mais do que simples viagens: são estadias de reabilitação e vivências personalizadas. "Ajudamos as famílias a vivenciar o descanso e a segurança que merecem, garantindo que nunca se sintam sozinhas em seus desafios", explica a equipe. O foco é criar um ambiente onde as barreiras da deficiência desapareçam perante o direito à alegria.</p>
        
        <p class="mb-4">Em Malta, o projeto se destaca pela <strong>abordagem individualizada</strong>. Cada criança tem seu ritmo respeitado durante as terapias e passeios, contando com supervisão médica e assistência profissional. O objetivo é permitir que os pais finalmente relaxem, enquanto as crianças ganham coragem e autonomia em um cenário mediterrâneo acolhedor.</p>

        <p class="mb-4">"Acreditamos que o apoio transforma vidas", afirma Jana. A ViaAble não apenas organiza viagens, mas constrói uma comunidade onde a diferença é tratada com dignidade. Para as famílias, o resultado é um retorno para casa com energia renovada e a certeza de que o mundo pode, sim, ser um lugar inclusivo.</p>
      `,
      author: 'Equipe ViaAble',
      publish_date: '29 de Dezembro de 2025',
      category: 'Projetos Sociais',
      image_url:
        'https://viaable.eu/storage/app/resources/resize/300_0_0_0_crop/img_32b452dd0cc406d32afaf76432826022.webp',
    },
  });

  const article4 = await prisma.posts.create({
    data: {
      slug: 'sustentabilidade-cidades-inteligentes',
      title: 'Cidades Inteligentes: Como a urbanização sustentável está mudando a vida no Brasil',
      summary: 'Curitiba e Florianópolis lideram ranking de sustentabilidade com novos projetos de mobilidade elétrica e gestão de resíduos.',
      content: `
        <p class="mb-4">A urbanização sustentável não é mais apenas uma tendência, mas uma necessidade urgente. Cidades brasileiras estão adotando soluções de Smart City para enfrentar desafios climáticos e populacionais.</p>
        <p class="mb-4">Em Curitiba, o novo sistema de transporte baseado inteiramente em ônibus elétricos já reduziu as emissões de carbono em áreas centrais. Já em Florianópolis, a gestão inteligente de resíduos através de sensores IoT otimizou a coleta em 30%.</p>
        <p class="mb-4">Especialistas defendem que o investimento em infraestrutura verde é o caminho mais curto para melhorar a qualidade de vida nas metrópoles.</p>
      `,
      author: 'Karla Duarte Ferreira',
      publish_date: '26 de Dezembro de 2025',
      category: 'Sustentabilidade',
      image_url: 'https://plus.unsplash.com/premium_photo-1688678097388-a0c77ea9ace1?q=80&w=846&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
  });

  console.log('Seed concluído!');
  console.log('Artigos criados:', { article1, article2, article3, article4 });
}

main()
  .catch((e) => {
    console.error('Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });