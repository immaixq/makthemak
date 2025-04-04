import { defineDocumentType, makeSource } from 'contentlayer/source-files';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeKatex from 'rehype-katex'
import remarkMath from 'remark-math'

const computedFields = {
  slug: {
    type: 'string',
    // text.mdx => text
    resolve: (doc) => doc._raw.sourceFileName.replace(/\.mdx$/, ''),
  }
}

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  //location of file wrt contentdirpath
  filePathPattern: 'blog/*.mdx',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true
    },
    publishedAt: {
      type: 'string',
      required: true
    },
    revisedAt: {
      type: 'string'
    },
    summary: {
      type: 'string',
      required: true
    },
    tags: {
      type: 'list',
      of: { type: 'string' }
    },
    likes: {
      type: 'number',
      default: 0
    }
  },
  computedFields
}));

export default makeSource({
  contentDirPath: 'src/content',
  documentTypes: [Blog],
  mdx: {
    remarkPlugins: [remarkGfm, remarkMath],
    rehypePlugins: [
      rehypeKatex,
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: 'one-dark-pro',
          onVisitLine(node) {
            // Prevent lines from collapsing in `display: grid` mode, and allow empty
            // lines to be copy/pasted
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }];
            }
          },
          onVisitHighlightedLine(node) {
            node.properties.className.push('line--highlighted');
          },
          onVisitHighlightedWord(node) {
            node.properties.className = ['word--highlighted'];
          },
        },
      ],
      [
        rehypeAutolinkHeadings,
        {
          properties: {
            className: ['anchor'],
          },
        },
      ],

    ]
  },
});

