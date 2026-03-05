using System.Drawing;
using Telerik.Reporting;
using Telerik.Reporting.Drawing;

namespace CRM.Enterprise.Api.Reporting;

public sealed class PipelineByStageTelerikReport : Report
{
    public PipelineByStageTelerikReport()
    {
        Name = "PipelineByStageTelerikReport";
        Width = Unit.Cm(24);

        var detail = new DetailSection
        {
            Height = Unit.Cm(3.2)
        };

        var title = new TextBox
        {
            Value = "Pipeline By Stage",
            Size = new SizeU(Unit.Cm(16), Unit.Cm(0.9)),
            Style =
            {
                Font = { Bold = true, Size = Unit.Point(18) },
                Color = Color.FromArgb(26, 54, 93)
            }
        };

        var subtitle = new TextBox
        {
            Value = "Telerik embedded report viewer is active for this workspace.",
            Location = new PointU(Unit.Cm(0), Unit.Cm(1.1)),
            Size = new SizeU(Unit.Cm(18), Unit.Cm(0.7)),
            Style =
            {
                Font = { Size = Unit.Point(10) },
                Color = Color.FromArgb(71, 85, 105)
            }
        };

        var generatedAt = new TextBox
        {
            Value = "= 'Generated: ' + Format('{0:G}', Now())",
            Location = new PointU(Unit.Cm(0), Unit.Cm(2.0)),
            Size = new SizeU(Unit.Cm(16), Unit.Cm(0.7)),
            Style =
            {
                Font = { Size = Unit.Point(9) },
                Color = Color.FromArgb(51, 65, 85)
            }
        };

        detail.Items.AddRange(new ReportItemBase[] { title, subtitle, generatedAt });
        Items.Add(detail);
    }
}
