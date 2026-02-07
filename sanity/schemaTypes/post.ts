export const post = {
    name: 'post',
    title: 'Blog Post',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        },
        {
            name: 'locale',
            title: 'Language',
            type: 'string',
            options: {
                list: [
                    { title: 'English', value: 'en' },
                    { title: 'French', value: 'fr' },
                ],
            },
            initialValue: 'en',
        },
        {
            name: 'type',
            title: 'Post Type',
            type: 'string',
            options: {
                list: [
                    { title: 'Business', value: 'Business' },
                    { title: 'Adventure', value: 'Adventure' },
                    { title: 'Journal', value: 'Journal' },
                ],
            },
            initialValue: 'Business',
        },
        {
            name: 'author',
            title: 'Author',
            type: 'reference',
            to: { type: 'author' },
        },
        {
            name: 'mainImage',
            title: 'Main image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'excerpt',
            title: 'Excerpt',
            type: 'text',
            rows: 3,
        },
        {
            name: 'publishedAt',
            title: 'Published at',
            type: 'datetime',
        },
        {
            name: 'content',
            title: 'Content',
            type: 'array',
            of: [
                {
                    type: 'block',
                    marks: {
                        annotations: [
                            {
                                name: 'link',
                                type: 'object',
                                title: 'Link',
                                fields: [
                                    {
                                        name: 'href',
                                        type: 'url',
                                        title: 'URL',
                                        validation: (Rule: any) =>
                                            Rule.uri({
                                                scheme: ['http', 'https', 'tel', 'mailto'],
                                                allowRelative: true,
                                            }),
                                    },
                                    {
                                        title: 'Open in new tab',
                                        name: 'openInNewTab',
                                        type: 'boolean',
                                        initialValue: false,
                                    },
                                ],
                            },
                        ],
                    },
                },
                { type: 'image' },
            ],
        },
        {
            name: 'gallery',
            title: 'Gallery',
            type: 'array',
            of: [{ type: 'image' }],
            hidden: ({ document }: any) => document?.type !== 'Adventure',
        },
    ],
};
