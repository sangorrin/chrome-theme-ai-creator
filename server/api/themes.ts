import { defineEventHandler, readBody } from 'h3';
import { getThemeGenerationStatus } from '../../utils/themeBuilder';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const jobId = body.jobId;

  if (!jobId) {
    return { error: 'Job ID is required' };
  }

  const status = await getThemeGenerationStatus(jobId);

  if (!status) {
    return { error: 'Job not found or still processing' };
  }

  return { status };
});