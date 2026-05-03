import { useState, useEffect } from 'react';
import Modal from '../ui/Modal';
import api from '../../lib/api';

const TaskForm = ({ isOpen, onClose, projectId, onTaskAdded, members = [] }) => {
  const [teamUsers, setTeamUsers] = useState(members);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    assignee: '',
    priority: 'MEDIUM',
    status: 'TODO',
    dueDate: ''
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    // Fetch all users to allow admin to assign to anyone, ignoring project limits for ease
    const fetchUsers = async () => {
      try {
        const res = await api.get('/users');
        setTeamUsers(res.data.users);
        if (!formData.assignee && res.data.users.length > 0) {
          setFormData(prev => ({ ...prev, assignee: res.data.users[0]._id }));
        }
      } catch (err) {
        // Fallback to members if fetch fails (e.g. user isn't admin or no permission)
        setTeamUsers(members);
        if (!formData.assignee && members.length > 0) {
          setFormData(prev => ({ ...prev, assignee: members[0]._id }));
        }
      }
    };
    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen, members]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        assignee: formData.assignee,
        priority: formData.priority,
        status: formData.status,
      };
      if (formData.dueDate) {
        payload.dueDate = new Date(formData.dueDate).toISOString();
      }

      await api.post(`/tasks/project/${projectId}`, payload);
      onTaskAdded();
      onClose();
      setFormData({
        title: '',
        description: '',
        assignee: members.length > 0 ? members[0]._id : '',
        priority: 'MEDIUM',
        status: 'TODO',
        dueDate: ''
      });
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to create task');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Task">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Title</label>
          <input
            type="text"
            required
            className="w-full px-4 py-3 bg-[#0B0E14] border border-white/5 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#5468FF]/50"
            placeholder="e.g. Design Homepage"
            value={formData.title}
            onChange={e => setFormData({...formData, title: e.target.value})}
          />
        </div>
        <div>
          <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Description (optional)</label>
          <textarea
            className="w-full px-4 py-3 bg-[#0B0E14] border border-white/5 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#5468FF]/50 h-20"
            placeholder="Task details..."
            value={formData.description}
            onChange={e => setFormData({...formData, description: e.target.value})}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Assignee</label>
            <select
              required
              className="w-full px-4 py-3 bg-[#0B0E14] border border-white/5 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#5468FF]/50"
              value={formData.assignee}
              onChange={e => setFormData({...formData, assignee: e.target.value})}
            >
              <option value="" disabled className="bg-[#0B0E14] text-slate-500">Select User</option>
              {teamUsers.map(m => (
                <option key={m._id} value={m._id} className="bg-[#0B0E14] text-white font-bold">{m.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Due Date</label>
            <input
              type="date"
              className="w-full px-4 py-3 bg-[#0B0E14] border border-white/5 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#5468FF]/50"
              value={formData.dueDate}
              onChange={e => setFormData({...formData, dueDate: e.target.value})}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Priority</label>
            <select
              className="w-full px-4 py-3 bg-[#0B0E14] border border-white/5 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#5468FF]/50"
              value={formData.priority}
              onChange={e => setFormData({...formData, priority: e.target.value})}
            >
              <option value="LOW" className="bg-[#0B0E14] text-white">Low</option>
              <option value="MEDIUM" className="bg-[#0B0E14] text-white">Medium</option>
              <option value="HIGH" className="bg-[#0B0E14] text-white">High</option>
            </select>
          </div>
          <div>
            <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Status</label>
            <select
              className="w-full px-4 py-3 bg-[#0B0E14] border border-white/5 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-[#5468FF]/50"
              value={formData.status}
              onChange={e => setFormData({...formData, status: e.target.value})}
            >
              <option value="TODO" className="bg-[#0B0E14] text-white">To Do</option>
              <option value="IN_PROGRESS" className="bg-[#0B0E14] text-white">In Progress</option>
              <option value="DONE" className="bg-[#0B0E14] text-white">Done</option>
            </select>
          </div>
        </div>
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 bg-[#5468FF] text-white font-black rounded-xl hover:bg-[#4353cc] disabled:opacity-50 transition-all shadow-lg shadow-[#5468FF]/20"
        >
          {submitting ? 'Adding...' : 'Add Task'}
        </button>
      </form>
    </Modal>
  );
};

export default TaskForm;
