import { query } from '../db';

export const getUserStats = async (userId: string) => {
  const [activeProjects] = await query<{ count: number }>(
    'SELECT COUNT(*) as count FROM projects WHERE user_id = ? AND status = ?',
    [userId, 'ongoing']
  );

  const [references] = await query<{ count: number }>(
    'SELECT COUNT(*) as count FROM research_references WHERE user_id = ?',
    [userId]
  );

  const [notes] = await query<{ count: number }>(
    'SELECT COUNT(*) as count FROM notes WHERE user_id = ?',
    [userId]
  );

  // Calculate hours logged from projects
  const projects = await query<{ start_date: Date; end_date: Date | null }>(
    'SELECT start_date, end_date FROM projects WHERE user_id = ? AND end_date IS NOT NULL',
    [userId]
  );

  const hoursLogged = projects.reduce((total, project) => {
    const start = new Date(project.start_date);
    const end = project.end_date ? new Date(project.end_date) : new Date();
    return total + (end.getTime() - start.getTime()) / (1000 * 60 * 60);
  }, 0);

  return {
    activeProjects: activeProjects.count,
    references: references.count,
    researchNotes: notes.count,
    hoursLogged: Math.round(hoursLogged)
  };
};