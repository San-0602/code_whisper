'use client';

import { useParams } from 'next/navigation';
import Workspace from '@/components/ide/workspace';

export default function ProjectPage() {
  const params = useParams();
  const projectId = params.projectId as string;

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Workspace projectId={projectId} />
    </div>
  );
}
