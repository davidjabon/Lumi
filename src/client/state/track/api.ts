import superagent from 'superagent';

export function track(
    category: string,
    action: string,
    name?: string,
    value?: string
): Promise<superagent.Response> {
    return superagent.post('/api/v1/track').send({
        action,
        category,
        name,
        value
    });
}
