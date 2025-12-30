import { useState } from 'react';
import { ClipboardList, Download, Send, Eye, Plus, Calendar, User, Printer, X, FileText, Video } from 'lucide-react';

export const InterviewManagement = () => {
  const [activeTab, setActiveTab] = useState('scheduled');
  const [showNewInterviewModal, setShowNewInterviewModal] = useState(false);
  const [showAssessmentModal, setShowAssessmentModal] = useState(false);
  const [selectedInterview, setSelectedInterview] = useState<any>(null);
  const [scheduledInterviews, setScheduledInterviews] = useState([
    {
      id: 'INT-001',
      candidateName: 'BRAHMAWAR JAGDISH GOPALBHAI',
      level: 'L4',
      juryMembers: ['Mr Abhi Sharma', 'Mr Ram nath'],
      date: '3rd December 2025',
      timings: '04:30-04:35pm',
      department: 'R&D (Designing)',
      venue: 'Online Mode',
      type: 'Skill Test ,Technical Round',
      month: 'December',
      assessment: {
        technicalKnowledge: { sectionHead: 4, hod: 4, remarks: 'Good understanding of EV components' },
        priorExperience: { sectionHead: 3, hod: 3, remarks: 'Limited experience but eager to learn' },
        qualifications: { sectionHead: 4, hod: 5, remarks: 'Excellent academic background' },
        learningAbility: { sectionHead: 5, hod: 4, remarks: 'Quick learner, grasps concepts fast' },
        behavior: { sectionHead: 4, hod: 4, remarks: 'Good team player, positive attitude' },
        recommendations: {
          sectionHead: 'Recommended for hiring. Good potential for growth.',
          hod: 'Strongly recommended. Will be a valuable asset to the team.',
          pa: 'Approved for hiring process continuation.',
          hr: 'All formalities completed. Ready for offer letter.'
        }
      }
    },
    {
      id: 'INT-001',
      candidateName: 'JANI HITESHKUMAR VAJERAMBHAI',
      level: 'L5',
      juryMembers: ['Mr Abhi Sharma', 'Mr Ram nath'],
      date: '3rd December 2025',
      timings: '04:35-04:40pm',
      department: 'R&D (Designing)',
      venue: 'Online Mode',
      type: 'Skill Test ,Technical Round',
      month: 'December',
      assessment: {
        technicalKnowledge: { sectionHead: 5, hod: 5, remarks: 'Exceptional technical skills' },
        priorExperience: { sectionHead: 5, hod: 4, remarks: 'Strong relevant experience' },
        qualifications: { sectionHead: 4, hod: 4, remarks: 'Well qualified for the role' },
        learningAbility: { sectionHead: 4, hod: 5, remarks: 'Excellent learning capability' },
        behavior: { sectionHead: 5, hod: 5, remarks: 'Outstanding interpersonal skills' },
        recommendations: {
          sectionHead: 'Highly recommended. Outstanding candidate.',
          hod: 'Top choice for the position. Hire immediately.',
          pa: 'Strongly approved.',
          hr: 'Offer letter to be issued at earliest.'
        }
      }
    },
    {
      id: 'INT-001',
      candidateName: 'SHAH NAND MAYURBHAI',
      level: 'L4',
      juryMembers: ['Mr Abhi Sharma', 'Mr Ram nath'],
      date: '3rd December 2025',
      timings: '04:40-04:45pm',
      department: 'R&D (Designing)',
      venue: 'Online Mode',
      type: 'Skill Test ,Technical Round',
      month: 'December'
    },
    {
      id: 'INT-001',
      candidateName: 'PATEL DEEPKUMAR JAYESHBHAI',
      level: 'L5',
      juryMembers: ['Mr Abhi Sharma', 'Mr Ram nath'],
      date: '3rd December 2025',
      timings: '04:45-04:50pm',
      department: 'R&D (Designing)',
      venue: 'Online Mode',
      type: 'Skill Test ,Technical Round',
      month: 'December'
    },
    {
      id: 'INT-001',
      candidateName: 'PARMAR AKASH KETANBHAI',
      level: 'L5',
      juryMembers: ['Mr Abhi Sharma', 'Mr Ram nath'],
      date: '3rd December 2025',
      timings: '04:50-04:55pm',
      department: 'R&D (Designing)',
      venue: 'Online Mode',
      type: 'Skill Test ,Technical Round',
      month: 'December'
    },
    {
      id: 'INT-001',
      candidateName: 'GAMIT VISHWAKUMARI DEEPAKBHAI',
      level: 'L6',
      juryMembers: ['Mr Abhi Sharma', 'Mr Ram nath'],
      date: '3rd December 2025',
      timings: '04:55-05:00pm',
      department: 'R&D (Designing)',
      venue: 'Online Mode',
      type: 'Skill Test ,Technical Round',
      month: 'December'
    },
    {
      id: 'INT-001',
      candidateName: 'Lakshmi Prasanna Ganta',
      level: 'L3',
      juryMembers: ['Mr Abhi Sharma', 'Mr Ram nath'],
      date: '3rd December 2025',
      timings: '05:00-05:05pm',
      department: 'R&D (Designing)',
      venue: 'Online Mode',
      type: 'Skill Test ,Technical Round',
      month: 'December'
    },
  ]);

  const [newInterview, setNewInterview] = useState({
    candidateName: '',
    level: '',
    juryMembers: ['', ''],
    date: '',
    timings: '',
    department: '',
    venue: '',
    type: '',
    month: ''
  });

  const handleScheduleInterview = () => {
    const interviewId = `INT-${String(scheduledInterviews.length + 1).padStart(3, '0')}`;
    const interview = {
      id: interviewId,
      ...newInterview
    };
    setScheduledInterviews([...scheduledInterviews, interview]);
    setShowNewInterviewModal(false);
    setNewInterview({
      candidateName: '',
      level: '',
      juryMembers: ['', ''],
      date: '',
      timings: '',
      department: '',
      venue: '',
      type: '',
      month: ''
    });
  };

  const tabs = [
    { id: 'scheduled', label: 'Scheduled Interviews' },
    { id: 'assessment', label: 'Assessment Sheet' },
    { id: 'schedule-sheet', label: 'Schedule Sheet' },
    { id: 'curriculum', label: 'Curriculum Sheet' },
  ];

  const handleShareToReception = (interview: any) => {
    alert(`Interview details for ${interview.candidateName} shared with Reception!`);
  };

  const handleOpenAssessment = (interview: any) => {
    setSelectedInterview(interview);
    setShowAssessmentModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] rounded-2xl p-6 text-white shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Interview Management</h2>
            <p className="text-white/80">Schedule, Assess & Manage Candidate Interviews</p>
          </div>
          <button
            onClick={() => setShowNewInterviewModal(true)}
            className="bg-white text-[#0B4DA2] px-6 py-3 rounded-xl font-bold hover:bg-gray-100 transition-all flex items-center gap-2"
          >
            <Plus size={20} />
            Schedule Interview
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-2xl p-2 shadow-md border border-gray-100">
        <div className="flex gap-2 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 rounded-xl font-bold text-sm whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Scheduled Interviews */}
      {activeTab === 'scheduled' && (
        <div className="space-y-6">
          {/* Schedule Header */}
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
            <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-gray-200">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="text-4xl font-bold text-[#1e3a5f]">SMG</div>
                  </div>
                  <h3 className="text-2xl font-bold text-[#1B254B]">SMG ELECTRIC SCOOTERS LTD</h3>
                  <p className="text-lg font-semibold text-gray-700 mt-1">INTERVIEW SCHEDULE</p>
                </div>
                <div className="text-right space-y-2">
                  <div className="bg-blue-100 px-4 py-2 rounded-lg border-2 border-gray-300">
                    <p className="text-xs font-bold text-gray-600">Interview Type</p>
                    <p className="font-bold text-[#1B254B]">{scheduledInterviews[0]?.type}</p>
                  </div>
                  <div className="bg-blue-100 px-4 py-2 rounded-lg border-2 border-gray-300">
                    <p className="text-xs font-bold text-gray-600">Month</p>
                    <p className="font-bold text-[#1B254B]">{scheduledInterviews[0]?.month}</p>
                  </div>
                  <div className="bg-blue-100 px-4 py-2 rounded-lg border-2 border-gray-300">
                    <p className="text-xs font-bold text-gray-600">Jury Members</p>
                    <p className="font-bold text-[#1B254B] text-sm">{scheduledInterviews[0]?.juryMembers.join(' ')}</p>
                  </div>
                </div>
              </div>

              {/* Microsoft Teams Link */}
              <div className="bg-yellow-300 px-4 py-3 rounded-lg border-2 border-yellow-400 mb-4">
                <div className="flex items-center gap-3">
                  <Video className="text-gray-700" size={20} />
                  <div className="flex-1">
                    <p className="font-bold text-gray-800 text-sm">MICROSOFT TEAMS LINK</p>
                    <a href="https://teams.live.com/meet/9345395532906?p=kRrTA9lSwez4F7Hafz" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="text-blue-600 hover:underline text-xs break-all">
                      https://teams.live.com/meet/9345395532906?p=kRrTA9lSwez4F7Hafz
                    </a>
                  </div>
                </div>
              </div>

              {/* Interview Rules */}
              <div className="bg-white p-4 rounded-lg border-2 border-gray-300">
                <h4 className="font-bold text-[#1B254B] mb-3">Interview Rules and Regulations</h4>
                <div className="space-y-2 text-sm">
                  <p><strong>1)</strong> Please Reach the Venue(30mins)/Join the Meeting (10 mins) before the Scheduled Time.</p>
                  <p><strong>2)</strong> Please Follow Formal Dress Code and maintain Discipline during the Interview.</p>
                  <p><strong>3)</strong> Please follow formal conduct during the Interview Round.</p>
                  <p><strong>4)</strong> No Friend or relative allowed inside Interview Venue or Meeting Room.</p>
                  <p><strong>5)</strong> Any Unfair means can lead to the legal and strict action.</p>
                  <p><strong>6)</strong> Mic should be off except Interview Time and video should be visible.</p>
                </div>
              </div>
            </div>

            {/* Schedule Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border-2 border-gray-400 px-4 py-3 text-left font-bold text-[#1B254B]">Interview Round</th>
                    <th className="border-2 border-gray-400 px-4 py-3 text-left font-bold text-[#1B254B]">Candidate Name</th>
                    <th className="border-2 border-gray-400 px-4 py-3 text-left font-bold text-[#1B254B]">Level</th>
                    <th className="border-2 border-gray-400 px-4 py-3 text-left font-bold text-[#1B254B]">Jury Name</th>
                    <th className="border-2 border-gray-400 px-4 py-3 text-left font-bold text-[#1B254B]">Date</th>
                    <th className="border-2 border-gray-400 px-4 py-3 text-left font-bold text-[#1B254B]">Timings</th>
                    <th className="border-2 border-gray-400 px-4 py-3 text-left font-bold text-[#1B254B]">Department</th>
                    <th className="border-2 border-gray-400 px-4 py-3 text-left font-bold text-[#1B254B]">Venue</th>
                    <th className="border-2 border-gray-400 px-4 py-3 text-left font-bold text-[#1B254B]">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduledInterviews.map((interview, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="border-2 border-gray-400 px-4 py-3 font-bold text-center">{interview.id}</td>
                      <td className="border-2 border-gray-400 px-4 py-3 font-semibold">{interview.candidateName}</td>
                      <td className="border-2 border-gray-400 px-4 py-3 text-center font-bold">{interview.level}</td>
                      <td className="border-2 border-gray-400 px-4 py-3">
                        {interview.juryMembers.map((member, i) => (
                          <div key={i} className="text-sm">{member}</div>
                        ))}
                      </td>
                      <td className="border-2 border-gray-400 px-4 py-3 font-medium">{interview.date}</td>
                      <td className="border-2 border-gray-400 px-4 py-3 font-medium">{interview.timings}</td>
                      <td className="border-2 border-gray-400 px-4 py-3 font-medium">{interview.department}</td>
                      <td className="border-2 border-gray-400 px-4 py-3 font-medium">{interview.venue}</td>
                      <td className="border-2 border-gray-400 px-4 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleOpenAssessment(interview)}
                            className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors"
                            title="Assessment Form"
                          >
                            <FileText size={18} />
                          </button>
                          <button
                            className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                            title="Download"
                          >
                            <Download size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Assessment Sheet */}
      {activeTab === 'assessment' && (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-200">
            <h3 className="font-bold text-lg text-[#1B254B]">Completed Interview Assessments</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Interview ID</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Candidate Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Position</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Department</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Interview Date</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Level</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Interviewers</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {scheduledInterviews.map((interview, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-bold text-[#1B254B]">{interview.id}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-[#1B254B]">{interview.candidateName}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">EV Designer</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{interview.department}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-600">{interview.date}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 rounded-lg text-xs font-bold bg-blue-50 text-blue-600">
                        {interview.level}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        {interview.juryMembers.map((member, i) => (
                          <div key={i} className="text-gray-600">{member}</div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleOpenAssessment(interview)}
                        className="px-4 py-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors text-sm font-bold flex items-center gap-2"
                      >
                        <FileText size={16} />
                        View Assessment Sheet
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Schedule Sheet */}
      {activeTab === 'schedule-sheet' && (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          {/* Header with SMG Logo and Title */}
          <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-gray-300">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="text-5xl font-bold text-[#1e3a5f] tracking-tight">SMG</div>
                <div>
                  <h3 className="text-2xl font-bold text-[#1B254B]">SMG ELECTRIC SCOOTERS LTD</h3>
                  <p className="text-lg font-semibold text-gray-700 mt-1">INTERVIEW SCHEDULE</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="bg-white px-4 py-2 rounded border-2 border-gray-300">
                  <span className="font-bold text-sm">Interview Type:</span>
                  <span className="ml-2 text-blue-600 font-semibold">Skill Test ,Technical Round</span>
                </div>
                <div className="bg-white px-4 py-2 rounded border-2 border-gray-300">
                  <span className="font-bold text-sm">Date:</span>
                  <span className="ml-2 text-blue-600 font-semibold">26/09/2025</span>
                </div>
                <div className="bg-white px-4 py-2 rounded border-2 border-gray-300">
                  <span className="font-bold text-sm">Jury Members:</span>
                  <span className="ml-2 text-blue-600 font-semibold">Mr Jaskaran Singh</span>
                </div>
              </div>
            </div>
          </div>

          {/* Schedule Table */}
          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="w-full border-2 border-gray-400">
                <thead>
                  <tr className="bg-yellow-300">
                    <th className="border-2 border-gray-400 px-6 py-4 text-left font-bold text-[#1B254B]" colSpan={2}>Name Of Person</th>
                    <th className="border-2 border-gray-400 px-6 py-4 text-center font-bold text-[#1B254B]" colSpan={3}>Call Making</th>
                    <th className="border-2 border-gray-400 px-6 py-4 text-center font-bold text-[#1B254B]" colSpan={2}>Review</th>
                    <th className="border-2 border-gray-400 px-6 py-4 text-center font-bold text-[#1B254B]">Contact Number</th>
                  </tr>
                  <tr className="bg-yellow-200">
                    <th className="border-2 border-gray-400 px-4 py-2" colSpan={2}></th>
                    <th className="border-2 border-gray-400 px-4 py-2 text-center font-semibold text-gray-700">Call 1</th>
                    <th className="border-2 border-gray-400 px-4 py-2 text-center font-semibold text-gray-700">Call 2</th>
                    <th className="border-2 border-gray-400 px-4 py-2 text-center font-semibold text-gray-700">Call 3</th>
                    <th className="border-2 border-gray-400 px-4 py-2" colSpan={2}></th>
                    <th className="border-2 border-gray-400 px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="border-2 border-gray-400 px-4 py-3 font-semibold" colSpan={2}>RASHI SHARMA</td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-center">×</td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-center"></td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-center"></td>
                    <td className="border-2 border-gray-400 px-4 py-3" colSpan={2}>Not Applicable</td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-center">##########</td>
                  </tr>
                  <tr className="bg-yellow-100 hover:bg-yellow-200">
                    <td className="border-2 border-gray-400 px-4 py-3 font-semibold" colSpan={2}>ASIF ANSARI</td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-center">×</td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-center bg-yellow-300"></td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-center"></td>
                    <td className="border-2 border-gray-400 px-4 py-3" colSpan={2}>IT</td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-center">##########</td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="border-2 border-gray-400 px-4 py-3 font-semibold" colSpan={2}>SHIVANSHU</td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-center">×</td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-center"></td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-center"></td>
                    <td className="border-2 border-gray-400 px-4 py-3" colSpan={2}>Marketing Graduates</td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-center">##########</td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="border-2 border-gray-400 px-4 py-3 font-semibold" colSpan={2}>RAVI</td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-center">×</td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-center"></td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-center"></td>
                    <td className="border-2 border-gray-400 px-4 py-3" colSpan={2}>Not Applicable</td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-center">##########</td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="border-2 border-gray-400 px-4 py-3 font-semibold" colSpan={2}>ANKIT</td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-center">×</td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-center"></td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-center"></td>
                    <td className="border-2 border-gray-400 px-4 py-3" colSpan={2}>Quality Inspection</td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-center">##########</td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="border-2 border-gray-400 px-4 py-3 font-semibold" colSpan={2}>SURAJ</td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-center">×</td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-center"></td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-center"></td>
                    <td className="border-2 border-gray-400 px-4 py-3" colSpan={2}>Contact Number Not Given</td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-center"></td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="border-2 border-gray-400 px-4 py-3 font-semibold" colSpan={2}>TANNU PRIYA</td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-center">×</td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-center"></td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-center"></td>
                    <td className="border-2 border-gray-400 px-4 py-3" colSpan={2}>Not Answrred</td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-center"></td>
                  </tr>
                  <tr className="bg-red-200 hover:bg-red-300">
                    <td className="border-2 border-gray-400 px-4 py-3 font-semibold" colSpan={2}>VANSHIKA PANDEY</td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-center bg-red-300">×</td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-center bg-red-300"></td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-center bg-red-300"></td>
                    <td className="border-2 border-gray-400 px-4 py-3 bg-red-300" colSpan={2}>IT</td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-center bg-red-300">##########</td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="border-2 border-gray-400 px-4 py-3 font-semibold" colSpan={2}>ROSHANI DARSHAN</td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-center"></td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-center"></td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-center"></td>
                    <td className="border-2 border-gray-400 px-4 py-3" colSpan={2}>PLASTIC MOULDING ENGINEER</td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-center">##########</td>
                  </tr>
                  <tr className="bg-yellow-100 hover:bg-yellow-200">
                    <td className="border-2 border-gray-400 px-4 py-3 font-semibold" colSpan={2}>BHUPENDRA SINGH</td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-center">×</td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-center bg-yellow-300"></td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-center"></td>
                    <td className="border-2 border-gray-400 px-4 py-3" colSpan={2}>AUTOCAD</td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-center">##########</td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="border-2 border-gray-400 px-4 py-3 font-semibold" colSpan={2}>PRANJAL SINGH</td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-center"></td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-center"></td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-center"></td>
                    <td className="border-2 border-gray-400 px-4 py-3" colSpan={2}>MECHANICAL</td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-center">##########</td>
                  </tr>
                  <tr className="bg-white hover:bg-gray-50">
                    <td className="border-2 border-gray-400 px-4 py-3 font-semibold" colSpan={2}>PANKAJ Singh</td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-center"></td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-center"></td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-center"></td>
                    <td className="border-2 border-gray-400 px-4 py-3" colSpan={2}>IT</td>
                    <td className="border-2 border-gray-400 px-4 py-3 text-center">##########</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="p-6 bg-gray-50 flex gap-3 justify-end border-t-2 border-gray-200">
            <button className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center gap-2">
              <Download size={20} />
              Download Schedule
            </button>
            <button className="bg-white border-2 border-[#0B4DA2] text-[#0B4DA2] px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center gap-2">
              <Printer size={20} />
              Print Schedule
            </button>
          </div>
        </div>
      )}

      {/* Curriculum Sheet */}
      {activeTab === 'curriculum' && (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
          <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-2xl font-bold text-[#1B254B]">SMG ELECTRIC SCOOTERS LTD</h3>
                <p className="text-lg font-semibold text-gray-700 mt-1">CURRICULUM SHEET</p>
              </div>
              <div className="text-right">
                <div className="text-5xl font-bold text-[#1e3a5f] tracking-tight">SMG</div>
              </div>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* Curriculum Details Section */}
            <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
              <h4 className="font-bold text-[#1B254B] mb-4 text-lg">Details</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">ROLE</label>
                  <input
                    type="text"
                    defaultValue="EV Designing and Prototyping"
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">POSITION</label>
                  <input
                    type="text"
                    defaultValue="Ev Designing Component Designing"
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">DEPARTMENT</label>
                  <input
                    type="text"
                    defaultValue="Research And Development"
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">INTERVIEWER/s:</label>
                  <input
                    type="text"
                    defaultValue="Mr Abhi Sharma, Mr Ram Nath"
                    className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Assessment Criteria Table */}
            <div className="overflow-x-auto">
              <table className="w-full border-2 border-gray-300">
                <thead>
                  <tr className="bg-blue-100">
                    <th className="border-2 border-gray-300 px-4 py-3 text-left font-bold text-[#1B254B]">Sr. No</th>
                    <th className="border-2 border-gray-300 px-4 py-3 text-left font-bold text-[#1B254B]">Basis</th>
                    <th className="border-2 border-gray-300 px-4 py-3 text-left font-bold text-[#1B254B]">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border-2 border-gray-300 px-4 py-3 font-bold text-center">1</td>
                    <td className="border-2 border-gray-300 px-4 py-3 font-semibold">Technical Knowledge/ Skills</td>
                    <td className="border-2 border-gray-300 px-4 py-3">
                      <div className="space-y-1">
                        <div>1) EV 2 wheeler Working</div>
                        <div>2) EV 2 wheeler Components Details</div>
                        <div>3) EV Battery and Motor functionality</div>
                      </div>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border-2 border-gray-300 px-4 py-3 font-bold text-center">2</td>
                    <td className="border-2 border-gray-300 px-4 py-3 font-semibold">Prior Work Experience<br/>(Only For Experienced)</td>
                    <td className="border-2 border-gray-300 px-4 py-3">
                      <div className="space-y-1">
                        <div>1) Previous Role Jobs</div>
                        <div>2) Introduction About Yourself</div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="border-2 border-gray-300 px-4 py-3 font-bold text-center">3</td>
                    <td className="border-2 border-gray-300 px-4 py-3 font-semibold">Autocad</td>
                    <td className="border-2 border-gray-300 px-4 py-3">
                      <div className="space-y-1">
                        <div>1) Introduction To Autocad</div>
                        <div>2) Types Of 3 d Softwares</div>
                        <div>3) Knowledge of Other 3D designing Softwares (Solidworks/Catia/NX etc)</div>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 justify-end mt-6 pt-6 border-t-2 border-gray-200">
              <button className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center gap-2">
                <Download size={20} />
                Download Curriculum
              </button>
              <button className="bg-white border-2 border-[#0B4DA2] text-[#0B4DA2] px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center gap-2">
                <Printer size={20} />
                Print Curriculum
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Assessment Modal */}
      {showAssessmentModal && selectedInterview && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] p-6 rounded-t-2xl text-white flex justify-between items-center sticky top-0 z-10">
              <div>
                <h2 className="text-2xl font-bold">Interview Assessment Form</h2>
                <p className="text-white/80 text-sm mt-1">{selectedInterview.candidateName}</p>
              </div>
              <button
                onClick={() => setShowAssessmentModal(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-8">
              {/* Form Header */}
              <div className="border-4 border-gray-800 rounded-lg overflow-hidden bg-white mb-6">
                <div className="p-6 bg-gradient-to-r from-blue-50 to-indigo-50 border-b-2 border-gray-300">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-2xl font-bold text-[#1B254B]">SMG ELECTRIC SCOOTERS LTD</h3>
                      <p className="text-lg font-semibold text-gray-700 mt-1">INTERVIEW ASSESSMENT FORM</p>
                    </div>
                    <div className="text-right">
                      <div className="text-5xl font-bold text-[#1e3a5f] tracking-tight">SMG</div>
                    </div>
                  </div>
                </div>

                {/* Interview Details */}
                <div className="p-6 bg-blue-50 border-b-2 border-gray-300">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white p-3 rounded border-2 border-gray-300">
                      <p className="text-xs font-bold text-gray-600">Date Of Interview:-</p>
                      <input type="text" defaultValue={selectedInterview.date} className="w-full mt-1 px-2 py-1 border border-gray-300 rounded font-medium" />
                    </div>
                    <div className="bg-white p-3 rounded border-2 border-gray-300">
                      <p className="text-xs font-bold text-gray-600">Timing of Interview:-</p>
                      <input type="text" defaultValue={selectedInterview.timings} className="w-full mt-1 px-2 py-1 border border-gray-300 rounded font-medium" />
                    </div>
                    <div className="bg-white p-3 rounded border-2 border-gray-300">
                      <p className="text-xs font-bold text-gray-600">Location Of Interview:-</p>
                      <input type="text" defaultValue={selectedInterview.venue} className="w-full mt-1 px-2 py-1 border border-gray-300 rounded font-medium" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    <div className="bg-white p-3 rounded border-2 border-gray-300">
                      <p className="text-xs font-bold text-gray-600">NAME</p>
                      <input type="text" defaultValue={selectedInterview.candidateName} className="w-full mt-1 px-2 py-1 border border-gray-300 rounded font-medium" />
                    </div>
                    <div className="bg-white p-3 rounded border-2 border-gray-300">
                      <p className="text-xs font-bold text-gray-600">POSITION</p>
                      <input type="text" className="w-full mt-1 px-2 py-1 border border-gray-300 rounded font-medium" />
                    </div>
                    <div className="bg-white p-3 rounded border-2 border-gray-300">
                      <p className="text-xs font-bold text-gray-600">DEPARTMENT</p>
                      <input type="text" defaultValue={selectedInterview.department} className="w-full mt-1 px-2 py-1 border border-gray-300 rounded font-medium" />
                    </div>
                  </div>
                  <div className="bg-white p-3 rounded border-2 border-gray-300 mt-4">
                    <p className="text-xs font-bold text-gray-600">INTERVIEWER/s:</p>
                    <input type="text" defaultValue={selectedInterview.juryMembers.join(', ')} className="w-full mt-1 px-2 py-1 border border-gray-300 rounded font-medium" />
                  </div>
                </div>

                {/* Rating Instructions */}
                <div className="p-4 bg-yellow-100 border-b-2 border-gray-300">
                  <p className="text-sm font-bold text-gray-800">Please give rating as per rating scale- {'{5- outstanding, 4- excellent, 3- satisfactory, 2- fair, 1- poor}'}</p>
                </div>

                {/* Assessment Table */}
                <div className="p-6">
                  <table className="w-full border-2 border-gray-400">
                    <thead>
                      <tr className="bg-blue-100">
                        <th className="border-2 border-gray-400 px-4 py-3 text-left font-bold text-[#1B254B] w-16">Sr. No</th>
                        <th className="border-2 border-gray-400 px-4 py-3 text-left font-bold text-[#1B254B]">Trait</th>
                        <th className="border-2 border-gray-400 px-4 py-3 text-left font-bold text-[#1B254B] w-32">Section Head</th>
                        <th className="border-2 border-gray-400 px-4 py-3 text-left font-bold text-[#1B254B] w-32">HOD</th>
                        <th className="border-2 border-gray-400 px-4 py-3 text-left font-bold text-[#1B254B] w-48">Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border-2 border-gray-400 px-4 py-3 font-bold text-center">1</td>
                        <td className="border-2 border-gray-400 px-4 py-3 font-semibold">Technical Knowledge/ Skills</td>
                        <td className="border-2 border-gray-400 px-4 py-3">
                          <input type="number" min="1" max="5" defaultValue={selectedInterview?.assessment?.technicalKnowledge?.sectionHead || ''} className="w-full px-2 py-1 border border-gray-300 rounded text-center" />
                        </td>
                        <td className="border-2 border-gray-400 px-4 py-3">
                          <input type="number" min="1" max="5" defaultValue={selectedInterview?.assessment?.technicalKnowledge?.hod || ''} className="w-full px-2 py-1 border border-gray-300 rounded text-center" />
                        </td>
                        <td className="border-2 border-gray-400 px-4 py-3">
                          <input type="text" defaultValue={selectedInterview?.assessment?.technicalKnowledge?.remarks || ''} className="w-full px-2 py-1 border border-gray-300 rounded" />
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border-2 border-gray-400 px-4 py-3 font-bold text-center">2</td>
                        <td className="border-2 border-gray-400 px-4 py-3 font-semibold">Prior Work Experience</td>
                        <td className="border-2 border-gray-400 px-4 py-3">
                          <input type="number" min="1" max="5" defaultValue={selectedInterview?.assessment?.priorExperience?.sectionHead || ''} className="w-full px-2 py-1 border border-gray-300 rounded text-center" />
                        </td>
                        <td className="border-2 border-gray-400 px-4 py-3">
                          <input type="number" min="1" max="5" defaultValue={selectedInterview?.assessment?.priorExperience?.hod || ''} className="w-full px-2 py-1 border border-gray-300 rounded text-center" />
                        </td>
                        <td className="border-2 border-gray-400 px-4 py-3">
                          <input type="text" defaultValue={selectedInterview?.assessment?.priorExperience?.remarks || ''} className="w-full px-2 py-1 border border-gray-300 rounded" />
                        </td>
                      </tr>
                      <tr>
                        <td className="border-2 border-gray-400 px-4 py-3 font-bold text-center">3</td>
                        <td className="border-2 border-gray-400 px-4 py-3 font-semibold">Qualifications</td>
                        <td className="border-2 border-gray-400 px-4 py-3">
                          <input type="number" min="1" max="5" defaultValue={selectedInterview?.assessment?.qualifications?.sectionHead || ''} className="w-full px-2 py-1 border border-gray-300 rounded text-center" />
                        </td>
                        <td className="border-2 border-gray-400 px-4 py-3">
                          <input type="number" min="1" max="5" defaultValue={selectedInterview?.assessment?.qualifications?.hod || ''} className="w-full px-2 py-1 border border-gray-300 rounded text-center" />
                        </td>
                        <td className="border-2 border-gray-400 px-4 py-3">
                          <input type="text" defaultValue={selectedInterview?.assessment?.qualifications?.remarks || ''} className="w-full px-2 py-1 border border-gray-300 rounded" />
                        </td>
                      </tr>
                      <tr className="bg-gray-50">
                        <td className="border-2 border-gray-400 px-4 py-3 font-bold text-center">4</td>
                        <td className="border-2 border-gray-400 px-4 py-3 font-semibold">Learning Ability</td>
                        <td className="border-2 border-gray-400 px-4 py-3">
                          <input type="number" min="1" max="5" defaultValue={selectedInterview?.assessment?.learningAbility?.sectionHead || ''} className="w-full px-2 py-1 border border-gray-300 rounded text-center" />
                        </td>
                        <td className="border-2 border-gray-400 px-4 py-3">
                          <input type="number" min="1" max="5" defaultValue={selectedInterview?.assessment?.learningAbility?.hod || ''} className="w-full px-2 py-1 border border-gray-300 rounded text-center" />
                        </td>
                        <td className="border-2 border-gray-400 px-4 py-3">
                          <input type="text" defaultValue={selectedInterview?.assessment?.learningAbility?.remarks || ''} className="w-full px-2 py-1 border border-gray-300 rounded" />
                        </td>
                      </tr>
                      <tr>
                        <td className="border-2 border-gray-400 px-4 py-3 font-bold text-center">5</td>
                        <td className="border-2 border-gray-400 px-4 py-3 font-semibold">Behavior/ Organization Fitment</td>
                        <td className="border-2 border-gray-400 px-4 py-3">
                          <input type="number" min="1" max="5" defaultValue={selectedInterview?.assessment?.behavior?.sectionHead || ''} className="w-full px-2 py-1 border border-gray-300 rounded text-center" />
                        </td>
                        <td className="border-2 border-gray-400 px-4 py-3">
                          <input type="number" min="1" max="5" defaultValue={selectedInterview?.assessment?.behavior?.hod || ''} className="w-full px-2 py-1 border border-gray-300 rounded text-center" />
                        </td>
                        <td className="border-2 border-gray-400 px-4 py-3">
                          <input type="text" defaultValue={selectedInterview?.assessment?.behavior?.remarks || ''} className="w-full px-2 py-1 border border-gray-300 rounded" />
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Guidelines */}
                  <div className="mt-6 bg-blue-50 p-4 rounded border-2 border-gray-300">
                    <h4 className="font-bold text-[#1B254B] mb-3">Guidelines For Interview</h4>
                    <div className="space-y-2 text-sm">
                      <p><strong>1)</strong> Please Reach the Venue/Join the Meeting 10 mins before the Scheduled Time</p>
                      <p><strong>2)</strong> Please Follow Formal Dress Code and maintain Discipline during the Interview.</p>
                      <p><strong>3)</strong> Please follow formal conduct during the Interview Round.</p>
                      <p><strong>4)</strong> No Friend or relative allowed inside Interview Venue or Meeting Room.</p>
                      <p><strong>5)</strong> Any Unfair means can lead to the legal and strict action.</p>
                    </div>
                  </div>

                  {/* Hiring Recommendation */}
                  <div className="mt-6">
                    <table className="w-full border-2 border-gray-400">
                      <thead>
                        <tr className="bg-blue-100">
                          <th className="border-2 border-gray-400 px-4 py-3 text-left font-bold text-[#1B254B]">Recommendation for Hiring</th>
                          <th className="border-2 border-gray-400 px-4 py-3 text-left font-bold text-[#1B254B]">Remarks</th>
                          <th className="border-2 border-gray-400 px-4 py-3 text-left font-bold text-[#1B254B]">Signature</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="border-2 border-gray-400 px-4 py-4 font-semibold">Section Head :</td>
                          <td className="border-2 border-gray-400 px-4 py-4">
                            <textarea className="w-full px-2 py-1 border border-gray-300 rounded" rows={2} defaultValue={selectedInterview?.assessment?.recommendations?.sectionHead || ''}></textarea>
                          </td>
                          <td className="border-2 border-gray-400 px-4 py-4">
                            <div className="h-12 border-b-2 border-gray-400"></div>
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border-2 border-gray-400 px-4 py-4 font-semibold">HOD:</td>
                          <td className="border-2 border-gray-400 px-4 py-4">
                            <textarea className="w-full px-2 py-1 border border-gray-300 rounded" rows={2} defaultValue={selectedInterview?.assessment?.recommendations?.hod || ''}></textarea>
                          </td>
                          <td className="border-2 border-gray-400 px-4 py-4">
                            <div className="h-12 border-b-2 border-gray-400"></div>
                          </td>
                        </tr>
                        <tr>
                          <td className="border-2 border-gray-400 px-4 py-4 font-semibold">P&A:</td>
                          <td className="border-2 border-gray-400 px-4 py-4">
                            <textarea className="w-full px-2 py-1 border border-gray-300 rounded" rows={2} defaultValue={selectedInterview?.assessment?.recommendations?.pa || ''}></textarea>
                          </td>
                          <td className="border-2 border-gray-400 px-4 py-4">
                            <div className="h-12 border-b-2 border-gray-400"></div>
                          </td>
                        </tr>
                        <tr className="bg-gray-50">
                          <td className="border-2 border-gray-400 px-4 py-4 font-semibold">HR:</td>
                          <td className="border-2 border-gray-400 px-4 py-4">
                            <textarea className="w-full px-2 py-1 border border-gray-300 rounded" rows={2} defaultValue={selectedInterview?.assessment?.recommendations?.hr || ''}></textarea>
                          </td>
                          <td className="border-2 border-gray-400 px-4 py-4">
                            <div className="h-12 border-b-2 border-gray-400"></div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-b-2xl flex gap-3 justify-end border-t border-gray-200 sticky bottom-0">
              <button
                onClick={() => setShowAssessmentModal(false)}
                className="px-6 py-3 rounded-xl font-bold text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Close
              </button>
              <button
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center gap-2"
              >
                <FileText size={20} />
                Save Assessment
              </button>
              <button
                onClick={() => window.print()}
                className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center gap-2"
              >
                <Download size={20} />
                Print Assessment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Interview Modal */}
      {showNewInterviewModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] p-6 rounded-t-2xl text-white flex justify-between items-center sticky top-0 z-10">
              <div>
                <h2 className="text-2xl font-bold">Schedule New Interview</h2>
                <p className="text-white/80 text-sm mt-1">Fill in the interview details</p>
              </div>
              <button
                onClick={() => setShowNewInterviewModal(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 space-y-4">
              {/* Candidate Information */}
              <div className="space-y-4">
                <h3 className="font-bold text-[#1B254B] text-lg border-b-2 border-gray-200 pb-2">Candidate Information</h3>
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Candidate Name *</label>
                  <input
                    type="text"
                    value={newInterview.candidateName}
                    onChange={(e) => setNewInterview({...newInterview, candidateName: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-medium focus:border-blue-500 focus:outline-none"
                    placeholder="Enter candidate full name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Level *</label>
                    <select
                      value={newInterview.level}
                      onChange={(e) => setNewInterview({...newInterview, level: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-medium focus:border-blue-500 focus:outline-none"
                    >
                      <option value="">Select Level</option>
                      <option value="L1">L1</option>
                      <option value="L2">L2</option>
                      <option value="L3">L3</option>
                      <option value="L4">L4</option>
                      <option value="L5">L5</option>
                      <option value="L6">L6</option>
                      <option value="L7">L7</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Department *</label>
                    <input
                      type="text"
                      value={newInterview.department}
                      onChange={(e) => setNewInterview({...newInterview, department: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-medium focus:border-blue-500 focus:outline-none"
                      placeholder="e.g., R&D (Designing)"
                    />
                  </div>
                </div>
              </div>

              {/* Jury Members */}
              <div className="space-y-4">
                <h3 className="font-bold text-[#1B254B] text-lg border-b-2 border-gray-200 pb-2">Jury Members</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Jury Member 1 *</label>
                    <input
                      type="text"
                      value={newInterview.juryMembers[0]}
                      onChange={(e) => setNewInterview({...newInterview, juryMembers: [e.target.value, newInterview.juryMembers[1]]})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-medium focus:border-blue-500 focus:outline-none"
                      placeholder="e.g., Mr Abhi Sharma"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Jury Member 2 *</label>
                    <input
                      type="text"
                      value={newInterview.juryMembers[1]}
                      onChange={(e) => setNewInterview({...newInterview, juryMembers: [newInterview.juryMembers[0], e.target.value]})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-medium focus:border-blue-500 focus:outline-none"
                      placeholder="e.g., Mr Ram nath"
                    />
                  </div>
                </div>
              </div>

              {/* Interview Schedule */}
              <div className="space-y-4">
                <h3 className="font-bold text-[#1B254B] text-lg border-b-2 border-gray-200 pb-2">Interview Schedule</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Date *</label>
                    <input
                      type="text"
                      value={newInterview.date}
                      onChange={(e) => setNewInterview({...newInterview, date: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-medium focus:border-blue-500 focus:outline-none"
                      placeholder="e.g., 3rd December 2025"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Timings *</label>
                    <input
                      type="text"
                      value={newInterview.timings}
                      onChange={(e) => setNewInterview({...newInterview, timings: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-medium focus:border-blue-500 focus:outline-none"
                      placeholder="e.g., 04:30-04:35pm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Month *</label>
                    <select
                      value={newInterview.month}
                      onChange={(e) => setNewInterview({...newInterview, month: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-medium focus:border-blue-500 focus:outline-none"
                    >
                      <option value="">Select Month</option>
                      <option value="January">January</option>
                      <option value="February">February</option>
                      <option value="March">March</option>
                      <option value="April">April</option>
                      <option value="May">May</option>
                      <option value="June">June</option>
                      <option value="July">July</option>
                      <option value="August">August</option>
                      <option value="September">September</option>
                      <option value="October">October</option>
                      <option value="November">November</option>
                      <option value="December">December</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Venue *</label>
                    <select
                      value={newInterview.venue}
                      onChange={(e) => setNewInterview({...newInterview, venue: e.target.value})}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-medium focus:border-blue-500 focus:outline-none"
                    >
                      <option value="">Select Venue</option>
                      <option value="Online Mode">Online Mode</option>
                      <option value="Office - Conference Room A">Office - Conference Room A</option>
                      <option value="Office - Conference Room B">Office - Conference Room B</option>
                      <option value="Office - HR Room">Office - HR Room</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Interview Type *</label>
                  <input
                    type="text"
                    value={newInterview.type}
                    onChange={(e) => setNewInterview({...newInterview, type: e.target.value})}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg font-medium focus:border-blue-500 focus:outline-none"
                    placeholder="e.g., Skill Test ,Technical Round"
                  />
                </div>
              </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-b-2xl flex gap-3 justify-end border-t border-gray-200 sticky bottom-0">
              <button
                onClick={() => setShowNewInterviewModal(false)}
                className="px-6 py-3 rounded-xl font-bold text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleScheduleInterview}
                disabled={!newInterview.candidateName || !newInterview.level || !newInterview.date || !newInterview.timings}
                className="bg-gradient-to-r from-[#0B4DA2] to-[#042A5B] text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Calendar size={20} />
                Schedule Interview
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
