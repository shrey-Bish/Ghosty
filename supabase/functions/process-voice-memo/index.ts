type ProcessVoiceMemoRequest = {
  audioUrl: string;
  careerGoal: string;
  targetRoles: string[];
};

Deno.serve(async (request) => {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const body = (await request.json()) as ProcessVoiceMemoRequest;

  return Response.json({
    status: 'queued',
    audioUrl: body.audioUrl,
    careerGoal: body.careerGoal,
    targetRoles: body.targetRoles,
    next: ['transcribe', 'extract', 'score', 'draft']
  });
});
