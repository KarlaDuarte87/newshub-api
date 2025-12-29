import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import 'dotenv/config';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL não está definida no arquivo .env');
}

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
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
      publish_date: '27 de Dezembro de 2024',
      category: 'Tecnologia',
      image_url: 'https://picsum.photos/seed/tech1/800/450',
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
      publish_date: '28 de Dezembro de 2024',
      category: 'Economia',
      image_url: 'https://picsum.photos/seed/econ1/800/450',
    },
  });

  const article3 = await prisma.posts.create({
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
      publish_date: '26 de Dezembro de 2024',
      category: 'Sustentabilidade',
      image_url: 'https://picsum.photos/seed/city1/800/450',
    },
  });

  console.log('Seed concluído!');
  console.log('Artigos criados:', { article1, article2, article3 });
}

main()
  .catch((e) => {
    console.error('Erro no seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });