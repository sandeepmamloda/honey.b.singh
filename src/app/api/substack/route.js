import Parser from "rss-parser";

const parser = new Parser();

export async function GET() {
  try {
    const feed = await parser.parseURL(
      "https://sandeepmamloda.substack.com/feed"
    );

    const posts = feed.items.map((item) => ({
      title: item.title,
      description: item.contentSnippet || item.content,
      link: item.link,
      date: item.pubDate,
    }));

    return Response.json({ posts });
  } catch (error) {
    console.error("Substack RSS Error:", error);

    return Response.json(
      { error: "Failed to fetch Substack RSS" },
      { status: 500 }
    );
  }
}